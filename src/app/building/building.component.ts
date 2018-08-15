import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  kitsInBuilding: Hero[];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { 
    
  }

  ngOnInit() {
  }

}
