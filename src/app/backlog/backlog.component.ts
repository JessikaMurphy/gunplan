import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//replace these two things with kit and kit service
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  heroes: Hero[];
  
  moveUpHero(hero: Hero): void{
    var indexInitial = this.heroes.indexOf(hero);
    var aboveHero = this.heroes[indexInitial - 1];
    this.heroes[indexInitial - 1] = hero;
    this.heroes[indexInitial] = aboveHero;
  }


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

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHeroes();
  }
  goBack(): void {
    this.location.back();
  }

}
