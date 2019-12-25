import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  backToCameraPreview = new EventEmitter();
  constructor() { }
}
