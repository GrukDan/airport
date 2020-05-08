package bsuir.model.viewModel;

import bsuir.model.User;

public class UserViewModel extends User {
    private String roleName;
    private String assessmentTaskName;


    @Override
    public String toString() {
        return super.toString() +  "UserViewModel{" +
                "roleName='" + roleName + '\'' +
                ", assessmentTaskName='" + assessmentTaskName + '\'' +
                '}';
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getAssessmentTaskName() {
        return assessmentTaskName;
    }

    public void setAssessmentTaskName(String assessmentTaskName) {
        this.assessmentTaskName = assessmentTaskName;
    }

    public UserViewModel(){}

    public UserViewModel(String roleName, String assessmentTaskName) {
        this.roleName = roleName;
        this.assessmentTaskName = assessmentTaskName;
    }

    public UserViewModel(User user){
        setIdUser(user.getIdUser());
        setRole(user.getRole());
        setUserName(user.getUserName());
        setUserSurname(user.getUserSurname());
        setEmail(user.getEmail());
        setAssessmentTask(user.getAssessmentTask());
    }


}
