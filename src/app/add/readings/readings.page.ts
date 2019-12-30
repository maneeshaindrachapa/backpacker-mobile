import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '../../services/utilities.service';
import {Platform} from '@ionic/angular';
import {SensorsService} from '../../services/sensors.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.page.html',
  styleUrls: ['./readings.page.scss'],
})
export class ReadingsPage implements OnInit {
  transferData;
  step = 0;
  readingInterval = 5;
  isSensorsCapturing = false;
  isSensorCapturingDone = true;
  isTimerChanging = false;
  capturingBtnText = 'START';

  constructor(private route: ActivatedRoute,
              private utilitiesService: UtilitiesService,
              private platform: Platform,
              private sensorsService: SensorsService,
  ) {
    this.step = 0;
    route.queryParams.subscribe((data: any) => {
      if (data) {
        this.transferData = JSON.parse(data.transferData);
      }
    });

    this.platform.ready().then(() => {
      this.platform.backButton.subscribe(() => {
        this.closeView();
      });
    });
  }

  ngOnInit() {

  }

  public ionViewWillEnter() {

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
      this.sensorsService.getMicrophoneData(this.readingInterval).then((data) => {
        this.transferData.sensorData.push({displayName: 'Noise Level', sensorReading: data, icon: 'mic'});
      });

      this.capturingBtnTextUpdate(this.readingInterval);
      this.isSensorsCapturing = true;
    }
  }

  capturingBtnTextUpdate(timerVal) {
        setTimeout(() => {
        this.capturingBtnText = timerVal.toString() + 's';
        timerVal -= 1;
        if (this.isSensorsCapturing) {
        if (timerVal >= -1) {
          this.capturingBtnTextUpdate(timerVal);
        } else {
          this.capturingBtnText = 'Done';
          this.isSensorsCapturing = false;
          this.next();
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
    if (this.step !== 4) {
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
