package bsuir.service;

import bsuir.model.User;
import bsuir.model.paginationModel.UserPaginationModel;
import bsuir.model.viewModel.UserViewModel;

import java.util.List;

public interface UserService {
    UserViewModel signIn(String login, String password);

    User saveUser(User user);

    UserViewModel updateUser(UserViewModel userViewModel);

    void delete(long id);

    List<UserViewModel> getAll();

    List<String> getSortParameter();

    UserPaginationModel getSortedUser(String parameter, int page, int size, boolean direction);

    UserViewModel getById(long id);

    List<UserViewModel> getExperts();

    boolean updateExperts(List<Long> experts, long idTask);

    List<UserViewModel> getExpertsByAssessmentTask(long assessmentTask);

    List<UserViewModel> getExpertsByIdIn(List<Long> idUsers);
}
