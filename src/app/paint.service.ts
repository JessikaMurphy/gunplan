import { Injectable } from '@angular/core';
import {Paint} from './paint';
import {PAINTS} from './mockedColors';

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  constructor() { }

  getPaints(): Paint[] {
    return PAINTS;
  }
}
