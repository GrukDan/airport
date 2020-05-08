package bsuir.controller;

import bsuir.model.Role;
import bsuir.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Role> getAll(){
        return roleService.getAll();
    }
}
