import { Injectable } from '@angular/core';
import {Paint} from './paint';
import {PAINTIDS} from './mockedColors';
import {PAINTRGBS} from './mockedColors';
import {PAINTNAMES} from './mockedColors';

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  constructor() { }

  getPaintNames(): String[] {
    return PAINTNAMES;
  }
  getPaintIds(): String[] {
    return PAINTIDS;
  }
  getPaintRgbs(): String[] {
    return PAINTRGBS;
  }
  

  constructPaintArray(): Paint[]{
    var mrColorPaints = [];
    var mrColorIds = this.getPaintIds();
    var paintRgbs = this.getPaintRgbs();
  
    var mrColorNames = this.getPaintNames();
    let itemCount = 0;
    
    for (let index = 0; index < mrColorIds.length; index++) {
      if(mrColorIds[index] != null){
        
        var indexPaint: Paint = {
          id : mrColorIds[index],
          name : mrColorNames[index],
          rgb : paintRgbs[index]
        }
        mrColorPaints[itemCount] = indexPaint;
        itemCount++;
      }
    }
    return mrColorPaints;
  }


}
