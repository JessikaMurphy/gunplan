import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-kit-list-buttons',
  templateUrl: './kit-list-buttons.component.html',
  styleUrls: ['./kit-list-buttons.component.css']
})
export class KitListButtonsComponent implements OnInit {

  constructor() { }
  

  ngOnInit() {
  }

}
