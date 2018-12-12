import { Component, OnInit } from '@angular/core';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthService } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-my-paints',
  templateUrl: './my-paints.component.html',
  styleUrls: ['./my-paints.component.css']
})
export class MyPaintsComponent implements OnInit {


  paints: Paint[];
  restItems: any;
  paints$: Observable<Paint[]>;
  paint$: Observable<Paint[]>;
  userId: string;
  userPaints: Paint[];
  paintCollectionReference: AngularFirestoreCollection<Paint>;
  private searchTerms = new Subject<string>();

  items: Observable<any[]>;
  constructor(
    private paintService: PaintService,
    private auth: AuthenticationService,
    private db: AngularFirestore,
    public authS: AuthService) {
  }
  options: Options = {
    floor: 0,
    ceil: 100,
    showSelectionBar: true,
    hideLimitLabels: true,
    hidePointerLabels: true,
    getSelectionBarColor: (value: number): string => {
        if (value <= 30) {
            return 'red';
        }
        if (value <75) {
            return 'orange';
        }
        if (value <= 90) {
            return 'yellow';
        }
        return '#2AE02A';
    }
  };


  ngOnInit() {
    //this.getPaints();
    //this.getColors();
    this.authS.user.subscribe(
      user => {
        if (user) {
          this.userId = user.uid
          console.log(this.userId)
          this.paintCollectionReference = this.db.collection<Paint>(`users/${this.userId}/userPaints`);
          this.paintCollectionReference.valueChanges().subscribe(
            userPaints => {
              this.userPaints = userPaints
              console.log(this.userPaints)
            }
          )
        }
      })
  }


  getColors(): void {
    this.paintService.getColors().subscribe(paints => {
      console.log(paints)
      this.paints = paints;
    });
  }
  onSelect(paint: Paint) {
    var id = this.db.createId();
    paint.fsid = id
    paint.amount = 100
    this.paintCollectionReference.doc(id).set(paint)
  }
  removePaint(paint: Paint) {
    this.paintCollectionReference.doc(paint.fsid).delete();
  }
  passPaint(paint: Paint, value: number){
    console.log(paint.fsid+'is'+ value)
    this.paintCollectionReference.doc(paint.fsid).update(paint);
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
