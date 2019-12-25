import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '../../services/utilities.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.page.html',
  styleUrls: ['./readings.page.scss'],
})
export class ReadingsPage implements OnInit {
  picture;
  constructor(private route: ActivatedRoute, private utilitiesService: UtilitiesService) {
    route.queryParams.subscribe((data: any) => {
      if (data) {
        this.picture = data.picture;
      }
    });
  }

  ngOnInit() {
  }

  goback() {
    this.utilitiesService.backToCameraPreview.emit();
  }

}
