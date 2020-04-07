import { Injectable } from '@angular/core';
import { Kit } from './Kit';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { AuthService } from './core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KitService {

  releaseDateFilter$: BehaviorSubject<boolean | null>;
  kitCollectionReference: AngularFirestoreCollection<Kit>;
  userId: string;
  userKits: Kit[];
  userKit$: Observable<Kit[]>;
  hideDetails: boolean;
  holdKit = new Array();
  kit = null;
  criteriaFilter$: BehaviorSubject<string | null>;

  priceFilter$: BehaviorSubject<boolean | null>;

  masterGradeCollectionReference: AngularFirestoreCollection<Kit>;
  kit$: Observable<Kit[]>;
  kits: Kit[];

  constructor(
    private db: AngularFirestore,
    public auth: AuthService
  ) {
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
        if (series === 'Mobile Suit Gundam') { query = query.where('series', '==', 'Mobile Suit Gundam') };
        if (series === 'Mobile Suit Gundam AGE') { query = query.where('series', '==', 'Mobile Suit Gundam') };
        if (series === 'Mobile Suit Gundam Unicorn') { query = query.where('series', '==', 'Mobile Suit Gundam Unicorn') };
        if (series === 'Mobile Suit Gundam SEED') { query = query.where('series', '==', 'Mobile Suit Gundam SEED') };
        if (releaseDate) { query = query.orderBy('release_date', 'asc') };
        if (!releaseDate) { query = query.orderBy('release_date', 'desc') };
        if (price) { query = query.orderBy('price', 'asc') };
        if (!price) { query = query.orderBy('price', 'desc') };
        return query;
      }).valueChanges()
    ));
    this.kit$.subscribe(kits => this.kits = kits)
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
  filterByReleaseDate(releaseDateAscending: boolean) {
    console.log(releaseDateAscending, 'passed');
    this.releaseDateFilter$.next(releaseDateAscending);
  }
  filterCriteria(criteria: string | null) {
    console.log(criteria, ' passed');
    this.criteriaFilter$.next(criteria);
  }
  filterByPrice(priceAscending: boolean) {
    console.log(priceAscending, 'passed');
    this.priceFilter$.next(priceAscending);
  }
}

