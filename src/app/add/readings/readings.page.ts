import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '../../services/utilities.service';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.page.html',
  styleUrls: ['./readings.page.scss'],
})
export class ReadingsPage implements OnInit {
  picture;
  step = 0;
  readingInterval = 10;
  isSensorsCapturing = false;
  isSensorCapturingDone = true;
  isTimerChanging = false;
  capturingBtnText = 'START';
  constructor(private route: ActivatedRoute, private utilitiesService: UtilitiesService, private platform: Platform) {
    this.step = 0;
    route.queryParams.subscribe((data: any) => {
      if (data) {
        this.picture = data.picture;
      }
    });
    this.platform.backButton.subscribe(() => {
      this.closeView();
    });
  }

  ngOnInit() {
  }

  public ionViewCanLeave() {
    return this.step === 0;
  }

  sensorsCaptureToggle() {
    if (this.isSensorsCapturing) {
      this.capturingBtnText = 'START';
      this.isSensorsCapturing = false;
    } else {
      this.capturingBtnText = 'Starting...';
      this.capturingBtnTextUpdate(this.readingInterval);
      this.isSensorsCapturing = true;
    }
  }

  capturingBtnTextUpdate(timerVal) {
        setTimeout(() => {
        this.capturingBtnText = timerVal.toString() + 's';
        console.log(timerVal);
        timerVal -= 1;
        if (this.isSensorsCapturing) {
        if (timerVal >= -1) {
          this.capturingBtnTextUpdate(timerVal);
        } else {
          this.capturingBtnText = 'Ending...';
        }} else {
          this.capturingBtnText = 'START';
        }
        }, 1000);
  }

  goBack() {
    if (this.step !== 0) {
      this.step -= 1;
    }
  }

  next() {
    if (this.step !== 2) {
      this.step += 1;
    }
  }

  closeView() {
    this.step = 0;
    this.utilitiesService.backToCameraPreview.emit();
  }

  share() {
    console.log('share clicked');
  }
}
