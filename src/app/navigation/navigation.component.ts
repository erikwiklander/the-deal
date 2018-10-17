import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  mediaWatcher: Subscription;
  navWatcher: Subscription;
  opened = true;
  mode = 'side';

  constructor(private media: ObservableMedia, private router: Router) {}

  ngOnInit() {
    this.mediaWatcher = this.media.subscribe(change => {
      if (change.mqAlias === 'xs') {
        this.opened = false;
        this.mode = 'over';
      } else {
        this.opened = true; // isAuthenticated
        this.mode = 'side';
      }
    });

    this.navWatcher = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.mode === 'over') {
          this.opened = false;
        } else {
          this.opened = true;
        }
      }
    });

  }

}
