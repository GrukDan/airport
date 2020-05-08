import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from "./component/welcome-page/welcome-page.component";
import {UserTableComponent} from "./component/user-table/user-table.component";
import {TaskTableComponent} from "./component/task-table/task-table.component";
import {HomeComponent} from "./component/home/home.component";
import {TaskPageComponent} from "./component/task-page/task-page.component";
import {AirportTableComponent} from "./component/airport-table/airport-table.component";


const routes: Routes = [
  {
    path: "",
    component: WelcomePageComponent
  },
  {
    path: "users/table",
    component: UserTableComponent
  },
  {
    path: "tasks/table",
    component: TaskTableComponent
  },
  {
    path: "home/:id/:userName",
    component: HomeComponent
  },
  {
    path: "tasks/:id/:taskName",
    component: TaskPageComponent
  },
  {
    path: "airports/table",
    component: AirportTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
