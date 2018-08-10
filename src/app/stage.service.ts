import { Injectable } from '@angular/core';
import { Stage } from './stage';
import { STAGES } from './mockedStages';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  constructor() { }

  getStages(): Stage[] {
    return STAGES;
  }
}
