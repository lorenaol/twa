package com.internship.epayment.rest;


import com.internship.epayment.entity.Role;
import com.internship.epayment.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public List<Role> getRoles(){
        return roleService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Role getRoleById(@PathVariable Long id) throws NotFoundException {
        return roleService.findById(id);
    }

    @GetMapping(path = "/findByName")
    public List<Role> getRolesByName(@RequestParam(value = "name") String name) throws NotFoundException {
        return roleService.findByName(name);
    }

    @GetMapping(path = "/findByCode")
    public Role getRolesByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        return roleService.findByCode(code);
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
        return roleService.updateRole(role);
    }
    @DeleteMapping
    public void deleteRole(@RequestBody Role role){
        roleService.deleteRole(role);
    }
}
