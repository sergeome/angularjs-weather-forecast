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
  private counter = 0;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.route.url.subscribe(urlSegments => {
      this.counter += 1;
      // const requestedUrl = '/legacy' + '#!/' + urlSegments.join('');
      const requestedUrl = 'legacy';
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(requestedUrl);
    });
  }

  ngOnInit() {}

}
