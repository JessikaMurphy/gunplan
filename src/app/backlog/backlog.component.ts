import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
/*
replace these two things with kit and kit service
*/
import { Kit } from '../Kit';
import { HeroService } from '../hero.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, combineLatest, timer, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

import { AuthService } from '../core/auth.service';
import { KitService } from '../kit.service';
import {
debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


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

  constructor(
    private location: Location,
    public auth: AuthService,
    private kitService: KitService,
  ) {

  }
  ngOnInit() {
  }

  onSelect(kit): void{
    this.hideDetails = !this.hideDetails;
    this.kit = kit
    console.log(this.kit);
  }

  search(term: string): void {
    this.kitService.searchByTerm(term);
  }

  goBack(): void {
    this.location.back();
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
