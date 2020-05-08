export class User {
  idUser:number;
  role:number;
  userName:string;
  userSurname:string;
  email:string;
  login:string;
  password:string;
  assessmentTask:number;

  public static clone(user:User):User{
    const clone:User = new User();
    clone.idUser = user.idUser;
    clone.role = user.role;
    clone.userName = user.userName;
    clone.userSurname = user.userSurname;
    clone.email = user.email;
    clone.assessmentTask = user.assessmentTask;
    clone.login = user.login;
    clone.password = user.password;
    return clone;
  }
}
