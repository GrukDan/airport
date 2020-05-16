import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true
  };

  error: boolean;
  errorMessage: string;
  templateShow: boolean;
  subscriptions: Subscription[];
  user: User;

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) {
    this.templateShow = true;
    this.user = new User();
    this.subscriptions = [];
    this.error = false;
  }


  ngOnInit() {
    this.templateShow = !this.tokenStorage.isAuthorized()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  authorization() {
    if (this.user.login != "" && this.user.password != "") {
      this.authService.login(this.user).subscribe(
        data => {
          if (data) {
            this.tokenStorage.saveUser(data);
            this.router.navigate(['/home',
              btoa(data.idUser.toString()),
              data.userName + data.userSurname]);
            this.modalRef.hide()
          } else {
            this.error = true;
            this.errorMessage = "Невозможно авторизоваться. Проверьте логин или пароль"
          }
        },
        err => {
          this.error = true;
          this.errorMessage = "Невозможно авторизоваться. Проверьте логин или пароль"
        }
      );
    }
  }
}
