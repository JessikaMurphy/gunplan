import { Component, OnInit } from '@angular/core';
import { Paint } from '../paint';
import {PaintService} from '../paint.service';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService} from '../_services/authentication.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-my-paints',
  templateUrl: './my-paints.component.html',
  styleUrls: ['./my-paints.component.css']
})
export class MyPaintsComponent implements OnInit {


  paints : Paint[];
  restItems: any;
  paints$: Observable<Paint[]>;
  paint$: Observable<Paint[]>;
  
  private searchTerms = new Subject<string>();
  constructor(
    private paintService: PaintService, 
    private auth: AuthenticationService,
    public authS: AuthService ) { }

  ngOnInit() {
      //this.getPaints();
      this.getColors();
      console.log('printing user paint list',this.paintService.getItemsList())
      
  }
  

  getColors(): void{
    this.paintService.getColors().subscribe(paints =>{
      console.log(paints)
      this.paints = paints;
    });
  }
  onSelect(paint){
    this.paintService.onSelect(paint)
  }
 
  
  
  
  /* getRestItems(): void {
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
   
  //this whole piping thing was inside ngOnInit()
      this.paints$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.paintService.searchPaints(term)), 
    );

    //the following functions were from the sql implementation
    onSelect(paint):void{
    console.log(paint);
    this.paintService.addPaint(paint).subscribe((res)=>{
      
        this.getPaints();
        console.log("yes");
      
    });
    //this is a good place to put get paints
    //this.getPaints();
  }
  removePaint(paint):void{
    console.log(paint);
    this.paintService.removePaint(paint).subscribe((res)=>{
      console.log("remove");
      this.getPaints();
    });
    
  }
  getPaints(): void {
    this.paintService.getPaints().subscribe(paints => {
          this.paints = paints;
          console.log(paints);
        });     
  }
  */

}
