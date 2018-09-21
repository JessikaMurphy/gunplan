import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //i want to get in the habit of the default components being
  ngOnInit() {
  }
  

  title = 'Demo';
  greeting = {};
  
  constructor(public messageService: MessageService){}
  
  
  

}
