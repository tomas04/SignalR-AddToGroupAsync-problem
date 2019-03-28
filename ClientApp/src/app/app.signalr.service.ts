import { Injectable, Inject} from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  public hubConnection: HubConnection;
  signalRUrl: string;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    console.log("starting signalr service");
    this.signalRUrl = baseUrl + 'test';
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.signalRUrl)
      .build();
  }

  public async startConnection() {
    await this.hubConnection.start()
      .then(() => {
        console.log("Connected to server");
      })
      .catch(err => {
        console.log('Error while starting connection: ');
        console.log(err);
      })
  }

  public subscribe(groupName: string) {
    console.log("subscribing to " + groupName);
    this.hubConnection.invoke("subscribe", groupName);
  }

  public unsubscribe(groupName: string) {
    console.log("Unsubscribing to " + groupName);
    this.hubConnection.invoke("unsubscribe", groupName);
  }

  public endConnection() {
    this.hubConnection
      .stop()
      .then(() =>
        console.log("Connection ended"));
  }

  public getData(groupName: string) {
    this.hubConnection.invoke("getgroupmessage", groupName);
  }
}
