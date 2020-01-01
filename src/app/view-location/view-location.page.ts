import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.page.html',
  styleUrls: ['./view-location.page.scss'],
})
export class ViewLocationPage implements OnInit {
  locationId;
  backRoute;
  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe((data: any) => {
      this.locationId = data.id;
      this.backRoute = data.backRoute;
    });
  }

  ngOnInit() {
  }


}
