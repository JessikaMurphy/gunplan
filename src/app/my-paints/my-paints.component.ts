import { Component, OnInit } from '@angular/core';
import { Paint } from '../paint';
import {PaintService} from '../paint.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-my-paints',
  templateUrl: './my-paints.component.html',
  styleUrls: ['./my-paints.component.css']
})
export class MyPaintsComponent implements OnInit {


  paints : Paint[];
  paints$: Observable<Paint[]>;
  private searchTerms = new Subject<string>();
  constructor(private paintService: PaintService) { }

  ngOnInit() {
    this.getPaints();
    
      this.paints$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.paintService.searchPaints(term)),
    );
  }
  
  getPaints(): void {
    this.paintService.getPaints()
        .subscribe(paints => this.paints = paints);
        
        
  }
  
  
  

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
