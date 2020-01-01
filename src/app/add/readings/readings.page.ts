import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { AlertController, Platform } from '@ionic/angular';
import { SensorsService } from '../../services/sensors.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from '../../services/user.service';

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
  isTimerChanging = false;
  capturingBtnText = 'START';
  uploadPercentage = 0;
  uploadDone = false;
  isShareClicked = false;
  successRedirectTimeout = 5;
  // recommendationText;
  constructor(private route: ActivatedRoute,
              private utilitiesService: UtilitiesService,
              private platform: Platform,
              private sensorsService: SensorsService,
              private firebaseService: FirebaseService,
              public alertController: AlertController,
              private router: Router) {
    this.step = 0;
    route.queryParams.subscribe((data: any) => {
      if (data) {
        this.transferData = JSON.parse(data.transferData);
      }
    });

    // this.platform.ready().then(() => {
    //   this.platform.backButton.subscribe(() => {
    //     this.closeView();
    //   });
    // });
  }

  ngOnInit() {
  }

  public ionViewWillEnter() {

  }

  logRatingChange(rating) {
    this.transferData.recommendation.rating = rating;
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
      this.transferData.timeStamp = new Date();
      this.sensorsService.getMicrophoneData(this.readingInterval).then((data: any) => {
        this.transferData.sensorData.push({ displayName: 'Noise Level', sensorReading: data.displayData, icon: 'mic' });
      });

      this.capturingBtnTextUpdate(this.readingInterval);
      this.isSensorsCapturing = true;
    }
  }

  capturingBtnTextUpdate(timerVal) {
    setTimeout(() => {
      this.capturingBtnText = timerVal.toString() + ' s';
      timerVal -= 1;
      if (this.isSensorsCapturing) {
        if (timerVal >= -1) {
          this.capturingBtnTextUpdate(timerVal);
        } else {
          this.capturingBtnText = 'Done';
          this.isSensorsCapturing = false;
          this.next();
        }
      } else {
        this.capturingBtnText = 'START';
      }
    }, 1000);
  }

  goBack() {
    if (this.step !== 0) {
      this.step -= 1;
      this.transferData.sensorData = [];
      this.capturingBtnText = 'START';
    }
    this.successRedirectTimeout = 10;
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
    this.isShareClicked = true;
    this.firebaseService.saveSensorData(this.transferData).then((data: any) => {
      data.subscribe((uploadVal: any) => {
        this.uploadPercentage = uploadVal / 100;
        if (uploadVal === 100) {
          this.uploadDone = true;
          this.updateSuccessTimeOut();
        }
      });
    });
  }

  updateSuccessTimeOut() {
    setTimeout(() => {
      this.successRedirectTimeout -= 1;
      if (this.successRedirectTimeout === 0) {
        this.goHome();
      }
      this.updateSuccessTimeOut();
    }, 1000);
  }

  goHome() {
    this.router.navigate(['./tabs/home']);
  }

  addRecommendation() {
    // this.transferData.recommendation.text = this.recommendationText;
    this.next();
    console.log(this.transferData);
    // console.log(this.recommendationText);
  }
}
