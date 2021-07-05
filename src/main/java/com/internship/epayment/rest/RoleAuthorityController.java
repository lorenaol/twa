package com.internship.epayment.rest;

import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.service.RoleAuthorityService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/api/roleauthorities")
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
    public RoleAuthority addRoleAuthority(@RequestBody RoleAuthority roleAuthority){
        RoleAuthority p = null;
        if(roleAuthority != null){
            p = roleAuthorityService.addRoleAuthority(roleAuthority);
        }
        return p;
    }

    @PutMapping
    @ResponseBody
    public RoleAuthority updateRoleAuthority(@RequestBody RoleAuthority roleAuthority){
        return roleAuthorityService.updateRoleAuthority(roleAuthority);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteRoleAuthority(@PathVariable Long id) throws NotFoundException {
        roleAuthorityService.deleteRoleAuthority(roleAuthorityService.findById(id));
    }

    @GetMapping(path = "/findByEndDate")
    public List<RoleAuthority> findRoleAuthoritiesByEndDate(@RequestParam(value = "end_date") Date date) {
        return roleAuthorityService.findByEndDate(date);
    }
    @GetMapping(path = "/findByStartDate")
    public List<RoleAuthority> findRoleAuthoritiesByStartDate(@RequestParam(value = "start_date") Date date) {
        return roleAuthorityService.findByStartDate(date);
    }
}
