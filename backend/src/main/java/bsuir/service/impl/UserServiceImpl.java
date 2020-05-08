package bsuir.service.impl;

import bsuir.model.Role;
import bsuir.model.User;
import bsuir.model.paginationModel.UserPaginationModel;
import bsuir.model.viewModel.UserViewModel;
import bsuir.repository.RoleRepository;
import bsuir.repository.TaskRepository;
import bsuir.repository.UserRepository;
import bsuir.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private TaskRepository taskRepository;

    private String[] parameterForSorting = {"userName","userSurname","email","role"};

    @Override
    public UserViewModel signIn(String login, String password) {
        User user = userRepository.findByLoginAndPassword(login, password);
        return buildUserViewModel(user);
    }

    private UserViewModel buildUserViewModel(User user){
        UserViewModel userViewModel = null;
        if(user!=null){
            userViewModel = new UserViewModel(user);
             setRoleName(userViewModel);
             setTaskName(userViewModel);
        }
        return userViewModel;
    }

    private UserViewModel setRoleName(UserViewModel userViewModel){
        if(userViewModel!=null){
            userViewModel.setRoleName(roleRepository.getOne(userViewModel.getRole()).getRole());
        }
        return userViewModel;
    }

    private UserViewModel setTaskName(UserViewModel userViewModel){
        if(userViewModel!=null && userViewModel.getAssessmentTask()!=null){
            userViewModel.setAssessmentTaskName(
                    taskRepository.getOne(
                            userViewModel.getAssessmentTask())
                            .getTaskName());
        }
        return userViewModel;
    }

    @Override
    public User saveUser(User user) {
        User user1 = userRepository.save(user);
        user1.setLogin(null);
        user1.setPassword(null);
        return user1;
    }

    @Override
    public UserViewModel updateUser(User user) {
        User user1 = userRepository.getOne(user.getIdUser());
        user.setLogin(user1.getLogin());
        user.setPassword(user1.getPassword());
        user1 = userRepository.save(user);
        return buildUserViewModel(user1);
    }

    @Override
    public void delete(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserViewModel> getAll() {
        List<User> users = userRepository.findAll();
        List<UserViewModel> userViewModels = new ArrayList<>();
        users.stream().forEach(user -> userViewModels.add(buildUserViewModel(user)));
        return userViewModels;
    }

    @Override
    public List<String> getSortParameter() {
        return Arrays.asList(parameterForSorting);
    }

    @Override
    public UserPaginationModel getSortedUser(String parameter, int page, int size, boolean direction) {
        Page<User> userPage;
        if (direction)
            userPage = userRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, parameter)));
        else
            userPage = userRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, parameter)));

        List<User> users = userPage.getContent();
        List<UserViewModel> userViewModels = new ArrayList<>();
        users.stream().forEach(user -> userViewModels.add(buildUserViewModel(user)));
        UserViewModel[] userViewModelArray = new UserViewModel[userViewModels.size()];
        userViewModels.toArray(userViewModelArray);
        return new UserPaginationModel(userPage.getTotalPages(),page,userViewModelArray);
    }

    @Override
    public UserViewModel getById(long id) {
        return buildUserViewModel(userRepository.getOne(id));
    }
}
