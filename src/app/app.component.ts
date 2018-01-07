import { Component, OnInit } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private upgrade: UpgradeModule) {}

  title = 'app';

  ngOnInit() {
    this.upgrade.bootstrap(document.body, ['forecastApp'])
  }
}
