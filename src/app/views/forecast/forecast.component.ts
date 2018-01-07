import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor() {}

  public city = 'DummyCity';
  public unit = 'F';
  public noForecast = false;

  public switchUnits(unit) {
    return unit;
  }

  ngOnInit() {}
}
