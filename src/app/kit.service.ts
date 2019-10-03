import { Injectable } from '@angular/core';
import { Kit } from './Kit';
import { MessageService } from './message.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, Subject, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { AuthService } from './core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KitService {

  releaseDateFilter$: BehaviorSubject<boolean|null>;
  kitCollectionReference: AngularFirestoreCollection<Kit>;
  userId: string;
  userKits: Kit[];
  userKit$: Observable<Kit[]>;


  hideDetails: boolean;
  holdKit = new Array();
  kit = null;
  criteriaFilter$: BehaviorSubject<string|null>;

  priceFilter$: BehaviorSubject<boolean|null>;

  masterGradeCollectionReference: AngularFirestoreCollection<Kit>;
  kit$: Observable<Kit[]>;
  kits: Kit[];

  constructor(
    private db: AngularFirestore,
    public auth: AuthService,
    private messageService: MessageService
  ) {
    this.releaseDateFilter$ = new BehaviorSubject(null);
    this.auth.user.subscribe(
      user => {
        if (user) {
          this.userId = user.uid
          console.log(this.userId)
          this.kitCollectionReference = this.db.collection<Kit>(`users/${this.userId}/userKits`);
          this.userKit$ = this.db.collection<Kit>(`users/${this.userId}/userKits`).valueChanges();
          this.userKit$.subscribe(userKits => {
            this.userKits = userKits

            console.log(userKits)
            console.log(this.userKits)
          })
        }
      })
      this.hideDetails = true;
    this.criteriaFilter$ = new BehaviorSubject(null);
    this.releaseDateFilter$ = new BehaviorSubject(null);
    this.priceFilter$ = new BehaviorSubject(null);
    //a reference to the masterGrade collection from firestore
    this.masterGradeCollectionReference = this.db.collection<Kit>('masterGrade');
    this.kit$ = combineLatest(
      this.criteriaFilter$,
      this.releaseDateFilter$,
      this.priceFilter$
      ).pipe(switchMap(([series, releaseDate, price]) =>
      db.collection<Kit>('masterGrade', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        const seriesFilter = ['Mobile Suit Gundam', 'Mobile Suit Gundam AGE', 'Mobile Suit Gundam Unicorn', 'Mobile Suit Gundam SEED'];
        query = seriesFilter.indexOf(series) >= 0 ? query.where('series', '==', series) : query;
        query = query.orderBy('release_date', releaseDate ? 'asc' : 'desc');
        query = query.orderBy('price', price ? 'asc' : 'desc');
        return query;
      }).valueChanges()
      ));
      this.kit$.subscribe(kits=>{
        this.kits = kits
      }
      )

  }

  addKitToUserKits(kit: Kit) {
    var id = this.db.createId()
    kit.fsid = id
    this.kitCollectionReference.doc(id).set(kit)
  }
  getUserKits() {
    console.log(this.userKits)
    return this.userKits
  }
  removeUserKit(kit: Kit) {
    this.kitCollectionReference.doc(kit.fsid).delete();
  }
  filterByReleaseDate(releaseDateAscending: boolean){
    console.log(releaseDateAscending, 'passed');
    this.releaseDateFilter$.next(releaseDateAscending);
  }
  filterCriteria(criteria: string|null){
    console.log(criteria,' passed');
    this.criteriaFilter$.next(criteria);
  }
  filterByPrice(priceAscending: boolean){
    console.log(priceAscending, 'passed');
    this.priceFilter$.next(priceAscending);
  }

  searchByTerm(term: string): Observable<Kit[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.kit$.get<Kit[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found kits matching "${term}"`)),
      catchError(this.handleError<Kit[]>('searchKits', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`KitService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }









}
