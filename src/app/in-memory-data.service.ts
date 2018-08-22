import { InMemoryDbService } from 'angular-in-memory-web-api';
import {PaintService} from './paint.service';
import {Paint} from './paint';
import {PAINTIDS} from './mockedColors';
import {PAINTRGBS} from './mockedColors';
import {PAINTNAMES} from './mockedColors';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const paints = this.constructPaintArray();
    return {heroes, paints};
    
    
    

  }
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
      if(mrColorIds[index] != null && mrColorIds[index] != mrColorIds[index - 1]){
        var thergb = paintRgbs[index];
        thergb = "#"+thergb;
        paintRgbs[index] = thergb;

        
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