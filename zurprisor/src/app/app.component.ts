import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {

  constructor() {
    //called first time before the ngOnInit()
  }

  title = 'zurprisor';

  public cdTime =
    {
      "stopTime": 1598104800,
      "format": 'dd:HH:mm:ss',

    };

  public countDownIsVisible: boolean;

  ngOnInit() {
    this.countDownIsVisible = true;

    var ts = Math.round((new Date()).getTime() / 1000);

    if (this.cdTime.stopTime - ts < 0) {
      this.countDownIsVisible = false;
    }

  }
}


