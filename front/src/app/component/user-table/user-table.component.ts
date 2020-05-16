import {Component, OnInit} from '@angular/core';
import {UserViewModel} from "../../model/view-models/user-view-model";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  parameters: string[];
  userViewModels: UserViewModel[];
  subscriptions: Subscription[] = [];

  countOfPages: number;
  parameter: string;
  direction: boolean;
  size: number;
  page: number;

  constructor(private userService: UserService) {
    this.userViewModels = [];
    this.page = 0;
    this.size = 5;
    this.direction = true;
    this.countOfPages = 11;
  }

  ngOnInit() {
    this.loadSortParameters();
  }

  sort(parameter: string) {
    this.parameter = parameter;
    this.direction = !this.direction;
    this.loadUsers();
  }

  pageChanged($event: PageChangedEvent) {
    this.page = $event.page - 1;
    this.loadUsers();
  }

  loadSortParameters() {
    this.subscriptions.push(this.userService.getSortParameter().subscribe(parameters => {
      this.parameters = parameters as string[];
      this.parameter = this.parameters[0];
      this.loadUsers()
    }))
  }

  loadUsers() {
    this.subscriptions.push(this.userService.getSortedUser(
      this.parameter,
      this.page,
      this.size,
      this.direction
    ).subscribe(sortedUsers => {
      this.userViewModels = sortedUsers.userViewModels as UserViewModel[];
      this.countOfPages = sortedUsers.countOfPages * 10;
    }))
  }

  btoa(s: string) {
    return btoa(s);
  }
}
