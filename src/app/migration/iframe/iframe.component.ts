import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements OnInit {

  public url: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.url.subscribe(_ => {
      const requestedUrl = 'http://localhost:8080/';
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(requestedUrl);
    });
  }
}
