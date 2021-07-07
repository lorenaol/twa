package com.internship.epayment.rest;

import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.service.RoleAuthorityService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping(path = "/api/rolesauthorities")
public class RoleAuthorityController {

    @Autowired
    private RoleAuthorityService roleAuthorityService;

    @GetMapping
    public List<RoleAuthority> getRoleAuthorities(){
        return roleAuthorityService.getAll();
    }

    @GetMapping(path = "/{id}")
    public RoleAuthority getRoleAuthorityById(@PathVariable Long id) throws NotFoundException {
        return roleAuthorityService.findById(id);
    }

    @PostMapping
    public RoleAuthority addRoleAuthority(@RequestBody RoleAuthority role){
        RoleAuthority r = null;
        if(role != null){
            r = roleAuthorityService.addRoleAuthority(role);
        }
        return r;
    }

    @PutMapping
    @ResponseBody
    public RoleAuthority updateRoleAuthority(@RequestBody RoleAuthority role){
        return roleAuthorityService.updateRoleAuthority(role);
    }
    @DeleteMapping
    public void deleteRole(@RequestBody RoleAuthority role){
        roleAuthorityService.deleteRoleAuthority(role);
    }
}
