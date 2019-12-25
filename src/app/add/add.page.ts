import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit, OnDestroy {

  picture;
  isFlashOn = false;
  isRearCamOn = true;
  constructor(private camera: Camera, private cameraPreview: CameraPreview, private file: File, private storage: AngularFireStorage) {
    // this.capture();
    this.startCameraPreview();
  }

  ngOnInit() {
    this.startCameraPreview();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.cameraPreview.stopCamera();
  }

  public ionViewWillEnter() {
    this.startCameraPreview();
  }

  public ionViewWillLeave() {
    this.cameraPreview.stopCamera();
  }

  // capture()  {
  //
  //   const options: CameraOptions = {
  //     quality: 50,
  //     targetHeight: 1024,
  //     targetWidth: 1024,
  //     allowEdit: true,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //
  //   this.camera.getPicture(options).then((imageData) => {
  //
  //     const filename = imageData.substring(imageData.lastIndexOf('/') + 1);
  //     const path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
  //     this.file.readAsDataURL(path, filename).then(base64data => {
  //       this.image = base64data;
  //       // this.storage.ref('/location_images/test_picture').putString(base64data, 'data_url').percentageChanges().subscribe((data) => {
  //       //   console.log(data);
  //       // });
  //       this.camera.cleanup();
  //     });
  //   });
  // }

  startCameraPreview() {
    console.log( window.screen.width * 0.8);
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 56,
      width: window.screen.width,
      height: window.screen.width,
      camera: 'rear',
      tapPhoto: false,
      previewDrag: false,
      toBack: false,
      alpha: 1
    }

// start camera
    this.cameraPreview.startCamera(cameraPreviewOpts);
    this.cameraPreview.setFocusMode('auto');
  }

  capture() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    };

    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      // this.picture = 'data:image/jpeg;base64,' + imageData;
      const filename = imageData.substring(imageData.lastIndexOf('/') + 1);
      const path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, filename).then(base64data => {
        this.picture = base64data;
        console.log(base64data);
        // this.storage.ref('pictures').putString(base64data, 'data_url');
        // this.storage.ref('/location_images/test_picture').putString(base64data, 'data_url').percentageChanges().subscribe((data) => {
        //   console.log(data);
        // });
      });
    }, (err) => {
      console.log(err);
      // add alert here
    });
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
    this.isRearCamOn = !this.isRearCamOn;
    if (this.isFlashOn) {
      this.cameraPreview.setFlashMode('on');
    } else {
      this.cameraPreview.setFlashMode('off');
    }
  }

  toggleFlash() {
    if (!this.isFlashOn) {
      this.cameraPreview.setFlashMode('on');
      this.isFlashOn = true;
    } else {
      this.cameraPreview.setFlashMode('off');
      this.isFlashOn = false;
    }
  }
}
