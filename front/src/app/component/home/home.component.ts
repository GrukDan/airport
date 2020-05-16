import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Role} from "../../model/role";
import {UserService} from "../../service/user.service";
import {RoleService} from "../../service/role.service";
import {TaskService} from "../../service/task.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ValidationService} from "../../service/validation.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Subscription} from "rxjs";
import {Task} from "../../model/task";
import {UserViewModel} from "../../model/view-models/user-view-model";
import {Rating} from "../../model/rating";
import {RatingService} from "../../service/rating.service";
import {AlternativeService} from "../../service/alternative.service";
import {Alternative} from "../../model/alternative";
import {AirportViewModel} from "../../model/view-models/airport-view-model";
import {AirportService} from "../../service/airport.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  idUser: number;
  userViewModel: UserViewModel;
  editUserViewModel: UserViewModel;
  roles: Role[];
  tasks: Task[];
  ratings: Rating[];
  alternatives: Alternative[];
  airportViewModels: AirportViewModel[];
  alternativesId: number[];
  edit: boolean;
  i: number;
  sumRating: number;
  checkRatingFlag: boolean;
  estimateButton: boolean;
  userForm: FormGroup;
  private airport: AirportViewModel;

  constructor(private userService: UserService,
              private roleService: RoleService,
              private taskService: TaskService,
              private ratingService: RatingService,
              private alternativeService: AlternativeService,
              private airportService: AirportService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private validationService: ValidationService,
              private router: Router,
              public tokenStorage: TokenStorageService) {

    this.userViewModel = new UserViewModel();
    this.editUserViewModel = new UserViewModel();
    this.edit = false;
    this.ratings = [];
    this.alternatives = [];
    this.alternativesId = []
    this.checkRatingFlag = true;
    this.route.paramMap.subscribe(params => {
      this.idUser = Number(atob(params.get('id')));
      this.loadUserViewModel();
    });
  }


  ngOnInit() {
  }

  loadUserViewModel() {
    this.subscriptions.push(this.userService.getUserViewModel(this.idUser).subscribe(user => {
      this.userViewModel = user as UserViewModel;
      if (this.userViewModel.assessmentTaskName)
        this.loadAlternatives(user.idUser, user.assessmentTask);
      this.editUserViewModel = UserViewModel.clone(user);
    }))
  }

  loadAlternatives(idUser: number, idTask: number) {
    this.subscriptions.push(this.alternativeService.getAlternativesByTask(idTask).subscribe(alternatives => {
      this.alternatives = alternatives as Alternative[];
      this.alternativesId = this.alternatives.map(alternative => alternative.idAlternative);
      this.loadAirportViewModels(alternatives.map(alternative => alternative.airport));
      this.loadRatings(idUser, this.alternativesId);
    }))
  }

  loadAirportViewModels(airportsId: number[]) {
    this.subscriptions.push(this.airportService.getAirportViewModelsByIdIn(airportsId).subscribe(airports => {
      this.airportViewModels = airports as AirportViewModel[];
    }))
  }

  loadRatings(idUser: number, alternativesId: number[]) {
    this.subscriptions.push(this.ratingService.loadRatingsByUserAndAlternatives(idUser, alternativesId).subscribe(ratings => {
      this.ratings = ratings as Rating[];
      this.estimateButton = false;
      if (this.ratings.length == 0) {
        this.estimateButton = true;
        alternativesId.forEach(alternativeId => {
          this.ratings.push(new Rating().buildRating(alternativeId, 0, this.tokenStorage.getIdUser()));
        })
      }
    }))
  }

  loadRole() {
    if (this.roles == null) {
      this.subscriptions.push(this.roleService.getAllRole().subscribe(roles => {
        this.roles = roles as Role[];
      }))
    }
  }

  saveUserViewModel(userViewModelForSaving
                      :
                      UserViewModel
  ) {
    this.subscriptions.push(this.userService.saveUserViewModel(userViewModelForSaving).subscribe(userViewModel => {
      this.userViewModel = userViewModel as UserViewModel;
      this.editUserViewModel = UserViewModel.clone(userViewModel);
    }))
  }

  getAirportNameByAlternative(alternative
                                :
                                Alternative
  ):
    string {
    if (this.airportViewModels) {
      this.airport = this.airportViewModels.find(airport => airport.idAirport == alternative.airport);
      return this.airport.country + '/' + this.airport.city + '/' + this.airport.airport;
    } else return "";
  }

  changeEdit() {
    this.edit = !this.edit;
  }

  _createForm() {
    if (this.userForm == null) {
      this.userForm = this.validationService.getUserFormGroup();
      this.userForm.controls['login'].clearValidators();
      this.userForm.controls['password'].clearValidators();
      this.userForm.controls['role'].clearValidators();
    }
  }

  get _userName() {
    return this.userForm.get('userName')
  }

  get _userSurname() {
    return this.userForm.get('userSurname')
  }

  get _email() {
    return this.userForm.get('email')
  }

  get _role() {
    return this.userForm.get('role')
  }


  save() {
    this.changeEdit();
    this.saveUserViewModel(this.editUserViewModel);
  }

  startEdit() {
    this._createForm();
    this.changeEdit()
    this.loadRole()
  }

  btoa(s: string) {
    return btoa(s);
  }

  delete(iduser: number) {
    this.router.navigate(['/'])
    this.subscriptions.push(this.userService.delete(iduser).subscribe())
  }

  saveRatings(ratings: Rating[]) {
    this.subscriptions.push(this.ratingService.save(ratings).subscribe(ratings => {
      this.ratings = ratings as Rating[];
      this.estimateButton = this.ratings.length != this.alternatives.length;
      console.log(ratings);
    }))
  }

  checkRatingSum(): boolean {
    for (this.sumRating = 0, this.i = 1; this.i <= this.alternatives.length; this.i++) {
      this.sumRating += this.i;
    }
    return this.checkRatingFlag = this.ratings.map(rating => rating.rating).reduce(function (a, b) {
      return a + b;
    }) == this.sumRating;
  }

  addRatings() {
    if (this.checkRatingSum()) {
      this.ratings.forEach(rating => rating.timeOfCreation = Date.now())
      this.saveRatings(this.ratings);
    }
  }

}
