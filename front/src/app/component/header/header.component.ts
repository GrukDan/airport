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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  userForm: FormGroup;
  taskForm: FormGroup;

  subscriptions: Subscription[] = [];

  user: User;
  task: Task;
  roles: Role[];
  experts:User[];
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
              public tokenStorage: TokenStorageService,
              private router: Router) {
    this._createForm();
    this.user = new User();
    this.task = new Task();
    this.roles = [];
    this.experts = [];
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

  loadUserForTask(): void {
    this.subscriptions.push(this.userService.getUserForTasks().subscribe(experts => {
      this.experts = experts as User[];
    }))
  }

  _createForm() {
    this.userForm = this.validationService.getUserFormGroup();
    this.taskForm = this.validationService.getTaskFormGroup();
  }

  addUser(): void {
    this.subscriptions.push(this.userService.save(this.user).subscribe(user => {
        this.user = new User();
        this.userForm.reset();
        this.modalRef.hide();
      },
      err => alert("Произошла ошибка! Попробуйте позже...")
    ))
  }

  addTask(executor): void {
    this.task.dateOfCreation = Date.now().toString();
    this.subscriptions.push(this.taskService.save(this.task).subscribe(task => {
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
    this.modalRef = this.modalService.show(template, this.config);
  }

  openUserModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    this.loadRole();
    this.loadUserForTask();
  }

  signOut() {
    this.tokenStorage.signOut()
    this.router.navigate(['/'])
  }

  btoa(s: string) {
    return btoa(s);
  }
}

