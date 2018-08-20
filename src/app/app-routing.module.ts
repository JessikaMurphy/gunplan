import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BuildingComponent } from './building/building.component';
import { MyPaintsComponent } from './my-paints/my-paints.component';


const routes: Routes = [
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'backlog', component: BacklogComponent },
  { path: 'my-paints', component: MyPaintsComponent },
  { path: 'building', component: BuildingComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
