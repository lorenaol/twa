package com.internship.epayment.rest;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.Authority;
import com.internship.epayment.service.ProductService;
import com.internship.epayment.service.RoleService;
import com.internship.epayment.service.AuthorityService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/authorities")
public class AuthorityController {

    @Autowired
    private AuthorityService authorityService;

    @GetMapping
    public List<Authority> getRoles(){
        List<Authority> list= authorityService.getAll();
        return list;
    }

    @GetMapping(path = "/{id}")
    public Authority getAuthoritiesById(@PathVariable Long id) throws NotFoundException {
        Authority authority = authorityService.findById(id);
        return authority;
    }

    @PostMapping
    public Authority addAuthority(@RequestBody Authority authority){
        Authority p = null;
        if(authority != null){
            p = authorityService.addAuthority(authority);
        }
        return p;
    }

    @PutMapping
    @ResponseBody
    public Authority updateAuthority(@RequestBody Authority authority){
        Authority p = authorityService.updateAuthority(authority);
        return p;
    }

    @DeleteMapping
    public void deleteAuthority(@RequestBody Authority authority){
        authorityService.deleteAuthority(authority);
    }

    @GetMapping(path = "/findByName")
    public List<Authority> findAuthoritiesByName(@RequestParam(value = "name") String name){
        List<Authority> list = authorityService.findByName(name);
        return list;
    }

    @GetMapping(path = "/findByCode")
    public List<Authority> findAuthoritiesByCode(@RequestParam(value = "code") String code){
        List<Authority> list = authorityService.findByCode(code);
        return list;
    }


}
