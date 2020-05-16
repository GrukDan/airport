import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserViewModel} from "../../model/view-models/user-view-model";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {AirportViewModel} from "../../model/view-models/airport-view-model";
import {AirportService} from "../../service/airport.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Country} from "../../model/country";
import {Airport} from "../../model/airport";
import {City} from "../../model/city";
import {TokenStorageService} from "../../service/token-storage.service";
import {CityService} from "../../service/city.service";
import {CountryService} from "../../service/country.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.css']
})
export class AirportTableComponent implements OnInit {

  airportViewModels: AirportViewModel[];
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;
  config = {
    animated: true
  };

  idCountry: number;

  newCountry: Country;
  newCity: City;
  newAirport: Airport;

  countries: Country[];
  cities: City[];

  error: boolean;
  errorMessage: string;
  editCountry: Country;
  editCity: City;
  editAirport: Airport;

  constructor(private airportService: AirportService,
              private modalService: BsModalService,
              private tokenStorage: TokenStorageService,
              private cityService: CityService,
              private countryService: CountryService) {
    this.airportViewModels = [];
    this.error = false;
  }

  ngOnInit() {
    this.loadAirportViewModals();
  }

  loadAirportViewModals() {
    this.subscriptions.push(this.airportService.getAirportViewModels().subscribe(airportViewModels => {
      this.airportViewModels = airportViewModels as AirportViewModel[];
    }))
  }

  openCountryModal(template: TemplateRef<any>) {
    this.newCountry = new Country();
    this.newCity = new City();
    this.newAirport = new Airport();
    this.modalRef = this.modalService.show(template, this.config);
  }

  openCityModal(template: TemplateRef<any>) {
    this.loadAllCountries()
    this.newCity = new City();
    this.modalRef = this.modalService.show(template, this.config);
  }

  openAirportModal(template: TemplateRef<any>) {
    this.loadAllCountries()
    this.newAirport = new Airport();
    this.modalRef = this.modalService.show(template, this.config);
  }

  openEditCountry(template: TemplateRef<any>, airportViewModel: AirportViewModel) {
    if (this.tokenStorage.isAdmin()) {
      this.editCountry = new Country();
      this.editCountry.idCountry = airportViewModel.idCountry;
      this.editCountry.country = airportViewModel.country
      this.modalRef = this.modalService.show(template, this.config);
    }
  }

  openEditCity(template: TemplateRef<any>, airportViewModel: AirportViewModel) {
    if (this.tokenStorage.isAdmin()) {
      this.editCity = new City();
      this.editCity.idCity = airportViewModel.idCity;
      this.editCity.city = airportViewModel.city
      this.editCity.country = airportViewModel.idCountry;
      this.modalRef = this.modalService.show(template, this.config);
    }
  }

  openEditAirport(template: TemplateRef<any>, airportViewModel: AirportViewModel) {
    if (this.tokenStorage.isAdmin()) {
      this.editAirport = new Airport();
      this.editAirport.idAirport = airportViewModel.idAirport;
      this.editAirport.airport = airportViewModel.airport;
      this.editAirport.city = airportViewModel.idCity;
      this.modalRef = this.modalService.show(template, this.config);
    }
  }

  loadAllCountries() {
    this.subscriptions.push(this.countryService.getAll().subscribe(countries => {
        this.countries = countries as Country[];
        if (!countries.length) {
          this.error = true;
          this.errorMessage = "Сначала нужно создать страну"
        }
      },
      err => {
        this.error = true;
        this.errorMessage = "Ошибка..."
      }))
  }

  loadCitiesByCountry(idCountry) {
    this.subscriptions.push(this.cityService.getAllByCountry(idCountry).subscribe(cities => {
        this.cities = cities as City[];
        if (!cities.length) {
          this.error = true;
          this.errorMessage = "Сначала нужно создать город"
        }
      },
      err => {
        this.error = true;
        this.errorMessage = "Ошибка..."
      }))
  }

  addCountry(country: Country) {
    this.subscriptions.push(this.countryService.save(country).subscribe(country => {
        this.modalRef.hide();
        this.setErrorInFalse();
        this.loadAirportViewModals();
      },
      err => {
        this.error = true;
        this.errorMessage = "Невозможно добавить. Возможно, такая страна уже существует"
      }
    ))
  }

  addCity(city: City, country) {
    city.country = country;
    this.subscriptions.push(this.cityService.save(city).subscribe(() => {
        this.modalRef.hide();
        this.setErrorInFalse();
        this.loadAirportViewModals();
      },
      err => {
        this.error = true;
        this.errorMessage = "Невозможно добавить. Возможно, такой город уже существует"
      }
    ))
  }

  addAirport(airport: Airport, city) {
    airport.city = city;
    this.subscriptions.push(this.airportService.save(airport).subscribe(() => {
        this.modalRef.hide();
        this.setErrorInFalse();
        this.loadAirportViewModals();
      },
      err => {
        this.error = true;
        this.errorMessage = "Невозможно добавить. Возможно, такой аэропорт уже существует"
      }
    ))
  }

  setErrorInFalse() {
    this.error = false;
    this.errorMessage = "";
  }

  deleteCountry(id: number) {
    this.subscriptions.push(this.countryService.delete(id).subscribe(() => {
        this.modalRef.hide();
        this.setErrorInFalse();
        this.loadAirportViewModals();
      },
      err => {
        this.error = true;
        this.errorMessage = "Невозможно выполнить..."
      }
    ))
  }

  deleteCity(id: number) {
    this.subscriptions.push(this.cityService.delete(id).subscribe(() => {
        this.modalRef.hide();
        this.setErrorInFalse();
        this.loadAirportViewModals();
      },
      err => {
        this.error = true;
        this.errorMessage = "Невозможно выполнить..."
      }
    ))
  }

  deleteAirport(id: number) {
    this.subscriptions.push(this.airportService.delete(id).subscribe(() => {
        this.modalRef.hide();
        this.setErrorInFalse();
        this.loadAirportViewModals();
      },
      err => {
        this.error = true;
        this.errorMessage = "Невозможно выполнить..."
      }
    ))
  }
}
