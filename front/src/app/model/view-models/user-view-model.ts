import {User} from "../user";

export class UserViewModel extends User{
  roleName:string;
  assessmentTaskName:string;

  public static clone(userViewModel:UserViewModel):UserViewModel{
    const clone:UserViewModel = new UserViewModel();
    clone.idUser = userViewModel.idUser;
    clone.role = userViewModel.role;
    clone.userName = userViewModel.userName;
    clone.userSurname = userViewModel.userSurname;
    clone.email = userViewModel.email;
    clone.assessmentTask = userViewModel.assessmentTask;
    clone.login = userViewModel.login;
    clone.password = userViewModel.password;
    clone.assessmentTaskName = userViewModel.assessmentTaskName
    clone.roleName = userViewModel.roleName;
    return clone;
  }
}
