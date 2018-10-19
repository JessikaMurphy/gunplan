import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//replace these two things with kit and kit service
import { Kit } from '../kit';
import { HeroService } from '../hero.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  
  kits: Observable<any[]>;
  hideDetails: boolean;
  holdKit = new Array();
  kit = null;
 
  
  
  /* moveUpHero(hero: Hero): void{
    var indexInitial = this.heroes.indexOf(hero);
    var aboveHero = this.heroes[indexInitial - 1];
    this.heroes[indexInitial - 1] = hero;
    this.heroes[indexInitial] = aboveHero;
  } */
  onSelect(kit):void{
    this.hideDetails = !this.hideDetails;
    this.kit = kit;
    console.log(this.kit);
  }

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
  } */

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    db: AngularFirestore
  ) { 
    this.kits = db.collection('masterGrade').valueChanges();
    this.hideDetails = true;
    
  }

  ngOnInit() {
   

  }
  goBack(): void {
    this.location.back();
  }
  

}
