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
        List<Role> list= roleService.getAll();
        return list;
    }

    @GetMapping(path = "/{id}")
    public Role getRolesById(@PathVariable Long id) throws NotFoundException {
        Role role = roleService.findById(id);
        return role;
    }

    @PostMapping
    public Role addRole(@RequestBody Role role){
        Role p = null;
        if(role != null){
            p = roleService.addRole(role);
        }
        return p;
    }

    @PutMapping
    @ResponseBody
    public Role updateRole(@RequestBody Role role){
        Role p = roleService.updateRole(role);
        return p;
    }

    @DeleteMapping
    public void deleteRole(@RequestBody Role role){
        roleService.deleteRole(role);
    }

    @GetMapping(path = "/findByName")
    public List<Role> findRolesByName(@RequestParam(value = "name") String name){
        List<Role> list = roleService.findByName(name);
        return list;
    }

    @GetMapping(path = "/findByCode")
    public List<Role> findRolesByCode(@RequestParam(value = "code") String code){
        List<Role> list = roleService.findByCode(code);
        return list;
    }


}
