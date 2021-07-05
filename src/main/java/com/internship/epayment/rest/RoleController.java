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
    public Role getRolesById(@PathVariable Long id) throws NotFoundException {
        return roleService.findById(id);
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
        return roleService.updateRole(role);
    }

    @DeleteMapping
    public void deleteRole(@RequestBody Role role){
        roleService.deleteRole(role);
    }

    @GetMapping(path = "/findByName")
    public List<Role> findRolesByName(@RequestParam(value = "name") String name){
        return roleService.findByName(name);
    }

    @GetMapping(path = "/findByCode")
    public List<Role> findRolesByCode(@RequestParam(value = "code") String code){
        return roleService.findByCode(code);
    }


}
