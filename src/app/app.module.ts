import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule ,
  HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { BannerComponent } from './banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridListComponent } from './grid-list/grid-list.component';
import { BacklogComponent } from './backlog/backlog.component';
import { StageComponent } from './stage/stage.component';
import { KitListButtonsComponent } from './kit-list-buttons/kit-list-buttons.component';
import { BuildingComponent } from './building/building.component';
import { MyPaintsComponent } from './my-paints/my-paints.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { MaterialComponent } from './material';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    BannerComponent,
    GridListComponent,
    BacklogComponent,
    StageComponent,
    KitListButtonsComponent,
    BuildingComponent,
    MyPaintsComponent,
    LoginComponent
  ],
  imports: [
    //remove forRoot if you want to use with other modules (children)
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialComponent,
  
    //HttpClientInMemoryWebApiModule.forRoot(
      //InMemoryDataService, { dataEncapsulation: false }
    //),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
