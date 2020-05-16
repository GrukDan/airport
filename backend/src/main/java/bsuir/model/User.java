package bsuir.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class User {
    private long idUser;
    private String userName;
    private String userSurname;
    private String email;
    private String login;
    private String password;
    private Long assessmentTask;
    private long role;

    @Id
    @Column(name = "id_user", nullable = false)
    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    @Basic
    @Column(name = "user_name", nullable = false, length = 45)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "user_surname", nullable = false, length = 45)
    public String getUserSurname() {
        return userSurname;
    }

    public void setUserSurname(String userSurname) {
        this.userSurname = userSurname;
    }

    @Basic
    @Column(name = "email", nullable = true, length = 45)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "login", nullable = false, length = 45)
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 45)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "assessment_task", nullable = true)
    public Long getAssessmentTask() {
        return assessmentTask;
    }

    public void setAssessmentTask(Long assessmentTask) {
        this.assessmentTask = assessmentTask;
    }

    @Basic
    @Column(name = "role", nullable = false)
    public long getRole() {
        return role;
    }

    public void setRole(long role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return idUser == user.idUser &&
                role == user.role &&
                Objects.equals(userName, user.userName) &&
                Objects.equals(userSurname, user.userSurname) &&
                Objects.equals(email, user.email) &&
                Objects.equals(login, user.login) &&
                Objects.equals(password, user.password) &&
                Objects.equals(assessmentTask, user.assessmentTask);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, userName, userSurname, email, login, password, assessmentTask, role);
    }
}
