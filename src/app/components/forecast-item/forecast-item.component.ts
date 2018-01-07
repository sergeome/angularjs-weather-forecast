import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.css']
})
export class ForecastItemComponent implements OnInit {

  constructor() { }

  public day = '11';
  public monthNameShort = 'Jan';
  public weekday = 'Sun';
  public highFahrenheit = '60';
  public lowFahrenheit = '50';
  public highCelsius = '25';
  public lowCelsius = '20';
  public unit = 'F';

  ngOnInit() {
  }

}
