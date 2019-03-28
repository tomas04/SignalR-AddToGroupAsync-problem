import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from '../app.signalr.service';

@Component({
  selector: 'app-helloworld',
  templateUrl: './helloworld.component.html',
})
export class HelloWorldComponent implements OnInit, OnDestroy {
  public groupName = "testGroup";

  constructor(private signalRService: SignalRService) {
    //this.subscribe();
  }

  ngOnInit() {
    console.log("Listening to state");
    this.signalRService.hubConnection.on('state', (data: string) => {
      console.log("Message received: " + data)
    });

    console.log("Subscribing");
    this.signalRService.subscribe(this.groupName);
  }

  ngOnDestroy() {
    console.log("Unsubscribing");
    this.signalRService.unsubscribe(this.groupName);
  }

  public getData() {
    this.signalRService.getData(this.groupName);
  }
}
