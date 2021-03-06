package bsuir.controller;


import bsuir.model.User;
import bsuir.model.paginationModel.UserPaginationModel;
import bsuir.model.viewModel.UserViewModel;
import bsuir.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "sign-in",method = RequestMethod.POST)
    public User signIn(@RequestBody User user){
        return userService.signIn(user.getLogin(),user.getPassword());
    }

    @RequestMapping(method = RequestMethod.PUT)
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @RequestMapping( method = RequestMethod.POST)
    public UserViewModel updateUser(@RequestBody UserViewModel userViewModel){
        return userService.updateUser(userViewModel);
    }

    @RequestMapping(value = "/update-experts",method = RequestMethod.POST)
    public boolean updateExperts(@RequestBody List<Long> experts,
                                 @RequestParam("idTask") long idTask){
        return userService.updateExperts(experts,idTask);
    }

    @RequestMapping(value = "/by-id",method = RequestMethod.GET)
    public UserViewModel getById(@RequestParam("id")long id){
        return userService.getById(id);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam("id")long id){
        userService.delete(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<UserViewModel> getAll(){
        return userService.getAll();
    }

    @RequestMapping(value = "/experts",method = RequestMethod.GET)
    public List<UserViewModel> getExperts(){
        return userService.getExperts();
    }

    @RequestMapping(value = "/sort-parameter", method = RequestMethod.GET)
    public List<String> getSortParameter() {
        return userService.getSortParameter();
    }

    @RequestMapping(value = "/sort", method = RequestMethod.GET)
    public UserPaginationModel getSortedUser(
            @RequestParam("parameter") String parameter,
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam("direction") boolean direction,
            @RequestParam("search") String search) {
        return userService.getSortedUser(parameter, page, size, direction);
    }

    @RequestMapping(value = "/by-assessment-task",method = RequestMethod.GET)
    public List<UserViewModel> getExpertsByAssessmentTask(@RequestParam("assessmentTask") long assessmentTask){
        return userService.getExpertsByAssessmentTask(assessmentTask);
    }

    @RequestMapping(value = "/experts-by-id",method = RequestMethod.POST)
    public List<UserViewModel> getExpertsByIdIn(@RequestBody List<Long> idUsers){
        return userService.getExpertsByIdIn(idUsers);
    }
}
