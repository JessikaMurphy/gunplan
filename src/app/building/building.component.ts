import { Component, OnInit } from '@angular/core';
import { Kit } from '../kit';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { KitService } from '../kit.service';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  kitsInBuilding: Kit[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private kitService: KitService,
    private paintService: PaintService
  ) { 
    
  }

  ngOnInit() {
  }

}
