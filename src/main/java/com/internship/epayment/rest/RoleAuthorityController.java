package com.internship.epayment.rest;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.repository.RoleAuthorityRepository;
import com.internship.epayment.service.RoleAuthorityService;
import com.internship.epayment.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
        List<RoleAuthority> list= roleAuthorityService.getAll();
        return list;
    }

    @GetMapping(path = "/{id}")
    public RoleAuthority getRoleAuthorityById(@PathVariable Long id) throws NotFoundException {
        RoleAuthority roleAuthority = roleAuthorityService.findById(id);
        return roleAuthority;
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
        RoleAuthority p = roleAuthorityService.updateRoleAuthority(roleAuthority);
        return p;
    }

    @DeleteMapping
    public void deleteRoleAuthority(@RequestBody RoleAuthority roleAuthority){
        roleAuthorityService.deleteRoleAuthority(roleAuthority);
    }

    @GetMapping(path = "/findByEndDate")
    public List<RoleAuthority> findRoleAuthoritiesByEndDate(@RequestParam(value = "endDate") Date date) {
        List<RoleAuthority> list = roleAuthorityService.findByEndDate(date);
        return list;
    }
    @GetMapping(path = "/findByStartDate")
    public List<RoleAuthority> findRoleAuthoritiesByStartDate(@RequestParam(value = "startDate") Date date) {
        List<RoleAuthority> list = roleAuthorityService.findByStartDate(date);
        return list;
    }
}
