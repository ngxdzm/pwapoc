import { ApplicationRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

import { WebNotificationService } from './components/notification/web-notification.service';
import { PwaUpdateDialogComponent } from './dialogs/pwa-update-dialog/pwa-update-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yespwa';
  // prompt to install
  deferredPrompt;

  constructor(private swupdate: SwUpdate,
    private swPush: SwPush,
    private pushService: WebNotificationService,
    private appRef: ApplicationRef,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.swupdate.isEnabled) {
      //-----------------------------------------------------------------------------------------
      // Allow the app to stabilize first, before starting polling for updates with `interval()`.
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everyTenSeconds$ = interval(10 * 1000);
      const everyTenSecondsOnceAppIsStable$ = concat(appIsStable$, everyTenSeconds$);
      everyTenSecondsOnceAppIsStable$.subscribe(() => this.swupdate.checkForUpdate());

      this.swupdate.available.subscribe(event => {
        this.swupdate.activateUpdate().then(() => {
          this.dialog.open(PwaUpdateDialogComponent, {
            width: '250px',
          });
        });
      });
      //-----------------------------------------------------------------------------------------
      // notifications
      if (this.swPush.isEnabled && Notification.permission === 'granted') {
        this.pushService.subscribeToNotification();
      }

      this.swPush.notificationClicks.subscribe(event => {
        const url = event.notification.data.url;
        if (url) {
          window.open(url, '_blank');
        }
      });

      //-----------------------------------------------------------------------------------------
      // install the application
      window.addEventListener('beforeinstallprompt', (e) => {
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
        e.preventDefault();
        //this.install();
      });

      //-----------------------------------------------------------------------------------------
    }
  }

  install() {
    this.deferredPrompt.prompt();

    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.deferredPrompt = null;
        }
      });
  }
}
