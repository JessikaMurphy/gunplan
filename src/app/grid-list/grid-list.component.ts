import { Component, OnInit } from '@angular/core';
import { Stage } from '../stage';
import { STAGES } from '../mockedStages';
import {StageService} from '../stage.service';



@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {

  stages: Stage[];

  constructor(private stageService: StageService) { }

  ngOnInit() {
    this.getStages();
  }

  getStages(): void {
    this.stages = this.stageService.getStages();
  }

}
