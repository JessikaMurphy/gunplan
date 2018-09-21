import { Component, OnInit } from '@angular/core';
import { Paint } from '../paint';
import {PaintService} from '../paint.service';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService} from '../_services/authentication.service';
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
  restItems: any;
  paints$: Observable<Paint[]>;
  private searchTerms = new Subject<string>();
  constructor(private paintService: PaintService, private auth: AuthenticationService ) { }

  ngOnInit() {
    this.getRestItems();
      
      this.paints$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.paintService.searchPaints(term)), 
    )
    ;
  }
  onSelect(paint):void{
    console.log(paint);
    this.auth.addPaint(paint).subscribe();

  }
  
  getPaints(): void {
    this.paintService.getPaints()
        .subscribe(paints => this.paints = paints);     
  }
  getRestItems(): void {
    this.paintService.restItemsServiceGetRestItems()
      .subscribe(
        paints => {
          this.paints = paints;
          
          console.log(this.paints);
        }
      )
  }
  
  
  

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
