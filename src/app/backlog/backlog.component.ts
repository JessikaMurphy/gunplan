import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//replace these two things with kit and kit service
import { Kit } from '../kit';
import { HeroService } from '../hero.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, combineLatest, timer, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';



@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  //kits: Observable<any[]>;
  hideDetails: boolean;
  holdKit = new Array();
  kit = null;
  criteriaFilter$: BehaviorSubject<string|null>;
  releaseDateFilter$: BehaviorSubject<boolean|null>;
  priceFilter$: BehaviorSubject<boolean|null>;

  masterGradeCollectionReference: AngularFirestoreCollection<Kit>;
  kit$: Observable<Kit[]>;
  

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public auth: AuthService,
    private db: AngularFirestore
  ) {
    //for the details panel when clicking a list item
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
      ).pipe(switchMap(([series,releaseDate,price]) =>
      db.collection<Kit>('masterGrade', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if(series === 'Mobile Suit Gundam'){ query = query.where('series','==','Mobile Suit Gundam')};
        if(series === 'Mobile Suit Gundam AGE'){ query = query.where('series','==','Mobile Suit Gundam')};
        if(series === 'Mobile Suit Gundam Unicorn'){ query = query.where('series','==','Mobile Suit Gundam Unicorn')};
        if(series === 'Mobile Suit Gundam SEED'){ query = query.where('series','==','Mobile Suit Gundam SEED')};
        if(releaseDate){query = query.orderBy('release_date','asc')};
        if(!releaseDate){query = query.orderBy('release_date', 'desc')};
        if(price){ query = query.orderBy('price','asc')};
        if(!price){ query = query.orderBy('price', 'desc')};
        return query;
      }).valueChanges()
      ));
    
  }
  ngOnInit() {
    this.kit$.subscribe(data => console.log(data) );
  }
  onSelect(kit):void{
    this.hideDetails = !this.hideDetails;
    this.kit = kit;

    console.log(this.kit);
  }
  goBack(): void {
    this.location.back();
  }
  
  filterCriteria(criteria: string|null){
    console.log(criteria,' passed');
    this.criteriaFilter$.next(criteria);
  }
  filterByReleaseDate(releaseDateAscending: boolean){
    console.log(releaseDateAscending, 'passed');
    this.releaseDateFilter$.next(releaseDateAscending);
  }
  filterByPrice(priceAscending: boolean){
    console.log(priceAscending, 'passed');
    this.priceFilter$.next(priceAscending);
  }
  
  

}
//dont notice me senpai
/* 
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  } 
    moveUpHero(hero: Hero): void{
    var indexInitial = this.heroes.indexOf(hero);
    var aboveHero = this.heroes[indexInitial - 1];
    this.heroes[indexInitial - 1] = hero;
    this.heroes[indexInitial] = aboveHero;
  } */