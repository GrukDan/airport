import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {User} from "../../model/user";
import {Role} from "../../model/role";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UserService} from "../../service/user.service";
import {TaskService} from "../../service/task.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {Task} from "../../model/task";
import {RoleService} from "../../service/role.service";
import {ValidationService} from "../../service/validation.service";
import {Alternative} from "../../model/alternative";
import {AirportViewModel} from "../../model/view-models/airport-view-model";
import {AirportService} from "../../service/airport.service";
import {UserViewModel} from "../../model/view-models/user-view-model";
import {AlternativeService} from "../../service/alternative.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  taskForm: FormGroup;

  subscriptions: Subscription[] = [];

  user: User;
  task: Task;
  roles: Role[];
  experts: UserViewModel[];
  updateExperts: UserViewModel[]
  airportViewModels: AirportViewModel[];
  alternatives: Alternative[];
  selectAirportViewModels: AirportViewModel[];
  addAlternativeButton: boolean;
  addExpertButton: boolean;
  repeatAlternativeError: boolean;
  repeatExpertError: boolean;
  modalRef: BsModalRef;
  config = {
    animated: true
  };

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private fb: FormBuilder,
              private validationService: ValidationService,
              private roleService: RoleService,
              private taskService: TaskService,
              private airportService: AirportService,
              private alternativeService: AlternativeService,
              public tokenStorage: TokenStorageService,
              private router: Router) {
    this._createForm();
    this.user = new User();
    this.roles = [];
    this.experts = [];
    this.addAlternativeButton = true;
    this.addExpertButton = true;
    this.repeatAlternativeError = false;
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  loadRole(): void {
    if (this.roles.length == 0) {
      this.subscriptions.push(this.roleService.getAllRole().subscribe(roles => {
        this.roles = roles as Role[];
      }))
    }
  }

  loadExperts(): void {
    this.subscriptions.push(this.userService.getExperts().subscribe(experts => {
      this.experts = experts as UserViewModel[];
    }))
  }


  loadAirportViewModels() {
    this.subscriptions.push(this.airportService.getAirportViewModels().subscribe(airportViewModels => {
      this.airportViewModels = airportViewModels as AirportViewModel[];
    }))
  }

  _createForm() {
    this.userForm = this.validationService.getUserFormGroup();
    this.taskForm = this.validationService.getTaskFormGroup();
  }

  addUser(): void {
    console.log(this.user)
    this.subscriptions.push(this.userService.save(this.user).subscribe(user => {
        console.log(user)
        this.user = new User();
        this.userForm.reset();
        this.modalRef.hide();
      },
      err => alert("Произошла ошибка! Попробуйте позже...")
    ))
  }

  hasDuplicates(array) {
    console.log(array)
    return (new Set(array)).size !== array.length;
  }

  checkRepeatAlternative() {
    this.repeatAlternativeError = this.hasDuplicates(this.alternatives
      .filter(alternative => alternative.airport != undefined)
      .map(alternative => alternative.airport))
  }

  checkRepeatExpert() {
    this.repeatExpertError = this.hasDuplicates(this.updateExperts
      .filter(expert => expert.idUser != undefined)
      .map(expert => expert.idUser))
  }

  addAlternativeSelect() {
    if (this.alternatives.length < this.airportViewModels.length) {
      this.alternatives.push(new Alternative());
    } else this.addAlternativeButton = false;
  }

  addExpertSelect() {
    if (this.updateExperts.length < this.experts.length) {
      this.updateExperts.push(new UserViewModel());
    } else this.addExpertButton = false;
  }

  saveExperts(idTask: number) {
    this.subscriptions.push(this.userService.updateExperts(this.updateExperts.map(expert => expert.idUser), idTask).subscribe())
  }

  saveAlternatives(idTask: number) {
    this.subscriptions.push(this.alternativeService.saveAlternatives(this.alternatives
      .map(function (alternative) {
        alternative.task = idTask;
        return alternative;
      })).subscribe())
  }

  addTask(): void {
    this.task.dateOfCreation = Date.now().toString();
    this.subscriptions.push(this.taskService.save(this.task).subscribe(task => {
      this.saveExperts(task.idTask);
      this.saveAlternatives(task.idTask);
      this.task = new Task();
      this.taskForm.reset();
      this.modalRef.hide();
    }, err => alert("Произошла ошибка! Попробуйте позже...")))
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

  get _login() {
    return this.userForm.get('login')
  }

  get _password() {
    return this.userForm.get('password')
  }

  get _taskName() {
    return this.taskForm.get('taskName')
  }

  get _taskDescription() {
    return this.taskForm.get('description')
  }

  openTaskModal(template: TemplateRef<any>) {
    this.loadAirportViewModels();
    this.loadExperts();
    this.task = new Task();
    this.alternatives = [];
    this.updateExperts = [];
    this.selectAirportViewModels = [];
    this.modalRef = this.modalService.show(template, this.config);
  }

  openUserModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    this.loadRole();
  }

  signOut() {
    this.tokenStorage.signOut()
    this.router.navigate(['/'])
  }

  btoa(s: string) {
    return btoa(s);
  }

}

