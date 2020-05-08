import { Component, OnInit } from '@angular/core';
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
  edit: boolean;
  userForm: FormGroup;

  constructor(private userService: UserService,
              private roleService: RoleService,
              private taskService: TaskService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private validationService: ValidationService,
              private router: Router,
              public tokenStorage: TokenStorageService) {

    this.userViewModel = new UserViewModel();
    this.editUserViewModel = new UserViewModel();
    this.edit = false;
    this.tasks = [];

    // subscribe to the parameters observable
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
      this.editUserViewModel = UserViewModel.clone(user);
      this.loadTasks(user.idUser);
    }))
  }

  loadRole() {
    if (this.roles == null) {
      this.subscriptions.push(this.roleService.getAllRole().subscribe(roles => {
        this.roles = roles as Role[];
      }))
    }
  }

  loadTasks(idUser: number) {
    this.subscriptions.push(this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks as Task[];
    }))
  }

  saveUserViewModel(userViewModelForSaving: UserViewModel) {
    this.subscriptions.push(this.userService.saveUserViewModel(userViewModelForSaving).subscribe(userViewModel => {
      this.userViewModel = userViewModel as UserViewModel;
      this.editUserViewModel = UserViewModel.clone(userViewModel);
    }))
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
      // if (this.tokenStorage.isAdmin() && this.userViewModel.iduser != this.tokenStorage.getIdUser()) {
      //   this.userForm.controls['userName'].clearValidators();
      //   this.userForm.controls['userSurname'].clearValidators();
      //   this.userForm.controls['email'].clearValidators();
      // }
      // if (this.tokenStorage.isProjectManager() && this.userViewModel.iduser != this.tokenStorage.getIdUser()) {
      //   this.userForm.controls['userName'].clearValidators();
      //   this.userForm.controls['userSurname'].clearValidators();
      //   this.userForm.controls['email'].clearValidators();
      //   this.userForm.controls['role'].clearValidators();
      // }
      // if (!this.tokenStorage.isProjectManager()
      //   && this.tokenStorage.isAdmin()
      //   && this.tokenStorage.getIdUser() == this.userViewModel.iduser) {
      //   this.userForm.controls['role'].clearValidators();
      // }
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
    //this.loadTasks();
    this.loadRole()
  }

  btoa(s: string) {
    return btoa(s);
  }

  delete(iduser: number) {
    this.router.navigate(['/'])
    this.subscriptions.push(this.userService.delete(iduser).subscribe())
  }

}
