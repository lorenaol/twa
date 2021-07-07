package com.internship.epayment.rest;


import com.internship.epayment.entity.UserRole;
import com.internship.epayment.service.UserRoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/userroles")
public class UserRoleController {
    @Autowired
    private UserRoleService userRoleService;

    @GetMapping
    public List<UserRole> getUserRoles(){
        return userRoleService.getAll();
    }

    @GetMapping(path = "/{id}")
    public UserRole getUserRoleById(@PathVariable Long id) throws NotFoundException {
        return userRoleService.findById(id);
    }

    @PostMapping
    public UserRole addUserRole(@RequestBody UserRole userRole){
        UserRole r = null;
        if(userRole != null){
            r = userRoleService.addUserRole(userRole);
        }
        return r;
    }

    @PutMapping
    @ResponseBody
    public UserRole updateUserRole(@RequestBody UserRole role){
        return userRoleService.updateUserRole(role);
    }

    @DeleteMapping
    public void deleteUserRole(@RequestBody UserRole role){
        userRoleService.deleteUserRole(role);
    }
}
