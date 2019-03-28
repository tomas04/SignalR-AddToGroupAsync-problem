import { Component, OnInit } from '@angular/core';
import { SignalRService } from './app.signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(public signalRService: SignalRService) {
    signalRService.startConnection();
  }

  ngOnInit() {
    //signalRService.
  }
}
