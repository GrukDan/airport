import { Component, OnInit } from '@angular/core';
import {UserViewModel} from "../../model/view-models/user-view-model";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {AirportViewModel} from "../../model/view-models/airport-view-model";
import {AirportService} from "../../service/airport.service";

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.css']
})
export class AirportTableComponent implements OnInit {

  parameters: string[];
  airportViewModels: AirportViewModel[];
  subscriptions: Subscription[] = [];

  constructor(private airportService: AirportService) {
    this.airportViewModels = [];
  }

  ngOnInit() {
    this.loadAirports();
  }

  loadAirports() {
    this.subscriptions.push(this.airportService.getAirportViewModels( ).subscribe(airportViewModels => {
      this.airportViewModels = airportViewModels as AirportViewModel[];
    }))
  }

  btoa(s: string) {
    return btoa(s);
  }
}
