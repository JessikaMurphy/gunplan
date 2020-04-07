import { Injectable } from '@angular/core';
import { Paint } from './paint';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, combineLatest, timer, BehaviorSubject, of } from 'rxjs';
import { AuthService } from './core/auth.service';
import { AngularFireList } from 'angularfire2/database';
import { MessageService } from './message.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaintService {

  observablePaints: Observable<Paint[]>;

  paintCollectionReference: AngularFirestoreCollection<Paint>;
  paint$: Observable<Paint[]>;
  items: AngularFireList<Paint> = null;
  userId: string;
  paints: Paint[];
  userPaints: Paint[];

  constructor(
    public auth: AuthService,
    private db: AngularFirestore,
    private messageService: MessageService
    
  ) {
    this.paintCollectionReference = this.db.collection<Paint>('paints');
    this.paint$ = this.paintCollectionReference.valueChanges();
    this.paint$.subscribe(
      paints => {
        this.paints = paints
      }
    )
    this.auth.user.subscribe(
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
    //this.paint$.subscribe(data => console.log(data) );
  }
  getColors(): Observable<Paint[]> {
    return this.paint$;
  }
  onSelect(paint) {
    console.log(paint)
    this.items.push(paint)
  }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`PaintService: ${message}`);
  }





}

/*  DEPRECATED FUNCTIONS AND PROPERTIES FROM BEFORE FIRESTORE/FIREBASE
    private paintsUrl = 'api/paints';
    private paintsUrl = 'http://localhost:8083/rest/paint/'; 
    private http: HttpClient,
    private messageService: MessageService,
    private databaseUrl = 'http://localhost:5000/api/user/me/mypaints';

    /* const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 
let requestOptions = new RequestOptions({ headers:null, withCredentials: true });

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems(): Observable<Paint[]> {
    return this.http.get<Paint[]>(this.paintsUrl)
    .pipe(
      tap(paints => this.log('fetched paints')),
      catchError(this.handleError('getPaints', []))
    );
  }
  addPaint(formattedPaintString: string){
    return this.http.put<any>('http://localhost:5000/api/user/me/add',
    formattedPaintString,)
    .pipe(map(
      response=> {
        if(response && (response.success==true))
          console.log(response.message);
          
      }))
  }
  removePaint(formattedPaintString: string){
    let req = new HttpRequest('DELETE', 'http://localhost:5000/api/user/me/remove');
    let newReq = req.clone({body: formattedPaintString});
    console.log(formattedPaintString);
    return this.http.request(newReq);
  }
  getPaints(): Observable<Paint[]> {
    return this.http.get<any>(this.paintsUrl)
    .pipe(map(
      response=> {
        if(response && (response.success==true))
          
          return response.paintList as Paint[];
          
      }))
  }
  searchPaints(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty paint array.
      return this.restItemsServiceGetRestItems();
    }
   return this.http.get<Paint[]>(`${this.paintsUrl}/search/${term}`)
   .pipe(
      tap(_ => this.log(`found paints matching "${term}"`)),
      catchError(this.handleError<Paint[]>('searchPaints', []))
    );
  }
 
  private log(message: string) {
    this.messageService.add(`PaintService: ${message}`);
  }
     /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
*/