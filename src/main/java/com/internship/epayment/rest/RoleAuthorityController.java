package com.internship.epayment.rest;

import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.service.RoleAuthorityService;
import com.internship.epayment.service.RoleService;
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
        List<RoleAuthority> list= roleAuthorityService.getAll();
        return list;
    }
    @GetMapping(path = "/{id}")
    public RoleAuthority getRoleAuthorityById(@PathVariable Long id) throws NotFoundException {
        RoleAuthority role = roleAuthorityService.findById(id);
        return  role;
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
        RoleAuthority r = roleAuthorityService.updateRoleAuthority(role);
        return r;
    }
    @DeleteMapping
    public void deleteRole(@RequestBody RoleAuthority role){
        roleAuthorityService.deleteRoleAuthority(role);
    }
}
