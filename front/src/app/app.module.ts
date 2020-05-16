import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {RatingModule} from "ngx-bootstrap/rating";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./component/header/header.component";
import {HomeComponent} from "./component/home/home.component";
import {UserTableComponent} from "./component/user-table/user-table.component";
import {WelcomePageComponent} from "./component/welcome-page/welcome-page.component";
import {TaskTableComponent} from "./component/task-table/task-table.component";
import {AirportTableComponent} from "./component/airport-table/airport-table.component";
import {TaskPageComponent} from "./component/task-page/task-page.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    WelcomePageComponent,
    HomeComponent,
    UserTableComponent,
    TaskTableComponent,
    AirportTableComponent,
    TaskPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
