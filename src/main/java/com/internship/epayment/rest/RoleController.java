package com.internship.epayment.rest;


import com.internship.epayment.entity.Role;
import com.internship.epayment.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@Controller
@RequestMapping(path = "/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public List<Role> getRoles(){
        List<Role> list= roleService.getAll();
        return list;
    }
    @GetMapping(path = "/{id}")
    public Role getRoleById(@PathVariable Long id) throws NotFoundException {
        Role role = roleService.findById(id);
        return  role;
    }

    @GetMapping(path = "/findByName")
    public List<Role> getRolesByName(@RequestParam(value = "name") String name) throws NotFoundException {
        List<Role> roles = roleService.findByName(name);
        return roles;
    }

    @GetMapping(path = "/findByCode")
    public Role getRolesByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        Role role = roleService.findByCode(code);
        return role;
    }

    @PostMapping
    public Role addRole(@RequestBody Role role){
        Role r = null;
        if(role != null){
            r = roleService.addRole(role);
        }
        return r;
    }

    @PutMapping
    @ResponseBody
    public Role updateRole(@RequestBody Role role){
        Role r = roleService.updateRole(role);
        return r;
    }
    @DeleteMapping
    public void deleteRole(@RequestBody Role role){
        roleService.deleteRole(role);
    }
}
