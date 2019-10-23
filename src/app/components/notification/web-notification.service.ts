import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {
  readonly VAPID_PUBLIC_KEY = 'BPGI3vdAMxuO6nlXQs6_8peiA-ZtWcqaxk2CqTTd6sTKyEsTQ6NjrlGs-Iahvt0BEcxk9ahiHvhrF73mwFxIlR4';

  // run nodejs api before server/server.js
  private baseUrl = 'https://13890f72.ngrok.io/notifications';

  constructor(private http: HttpClient,
    private swPush: SwPush) { }

  subscribeToNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.sendToServer(sub))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  sendToServer(params: any) {
    this.http.post(this.baseUrl, { notification: params }).subscribe();
  }
}
