import { Component, OnInit } from '@angular/core';
import { Paint } from '../paint';
import {PaintService} from '../paint.service';


@Component({
  selector: 'app-my-paints',
  templateUrl: './my-paints.component.html',
  styleUrls: ['./my-paints.component.css']
})
export class MyPaintsComponent implements OnInit {


  paints: Paint[];
  constructor(private paintService: PaintService) { }

  ngOnInit() {
    this.getPaints();
  }
  getPaints(): void {
    this.paintService.getPaints()
    .subscribe(paints => this.paints = paints);
  }

}
