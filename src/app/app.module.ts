import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SomePageComponent } from './components/some-page/some-page.component';
import { PwaUpdateDialogComponent } from './dialogs/pwa-update-dialog/pwa-update-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ResourcesComponent } from './components/resources/resources.component';
import { HttpClientModule } from '@angular/common/http';
import { PwaInstallDialogComponent } from './dialogs/pwa-install-dialog/pwa-install-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    SomePageComponent,
    PwaUpdateDialogComponent,
    ResourcesComponent,
    PwaInstallDialogComponent,
    NotificationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PwaUpdateDialogComponent]
})
export class AppModule { }
