import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { BannerComponent } from './banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatGridTile, MatGridList} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { GridListComponent } from './grid-list/grid-list.component';
import { BacklogComponent } from './backlog/backlog.component';
import { StageComponent } from './stage/stage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    BannerComponent,
    MatGridList,
    GridListComponent,
    MatGridTile,
    BacklogComponent,
    StageComponent
  ],
  imports: [
    //remove forRoot if you want to use with other modules (children)
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule, 
    MatCheckboxModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [MatButtonModule, MatCheckboxModule,MatGridTile],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
