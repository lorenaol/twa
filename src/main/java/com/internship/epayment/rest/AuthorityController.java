package com.internship.epayment.rest;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Role;
import com.internship.epayment.service.AuthorityService;
import com.internship.epayment.service.CategoryService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/authorities")
public class AuthorityController {

    @Autowired
    private AuthorityService authorityService;

    @GetMapping
    public List<Authority> getAuthorities(){
        List<Authority> list= authorityService.getAll();
        return list;
    }

    @GetMapping(path = "/{id}")
    public Authority getAuthorityById(@PathVariable Long id) throws NotFoundException {
        Authority authority = authorityService.findById(id);
        return  authority;
    }

    @GetMapping(path = "/findByName")
    public List<Authority> getAuthoritiesByName(@RequestParam(value = "name") String name) throws NotFoundException {
        List<Authority> authorities = authorityService.findByName(name);
        return authorities;
    }

    @GetMapping(path = "/findByCode")
    public Authority getAuthorityByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        Authority authority = authorityService.findByCode(code);
        return authority;
    }

    @PostMapping
    public Authority addAuthority(@RequestBody Authority authority){
        Authority a = null;
        if(authority != null){
            a = authorityService.addAuthority(authority);
        }
        return a;
    }

    @PutMapping
    @ResponseBody
    public Authority updateAuthority(@RequestBody Authority authority){
        Authority a = authorityService.updateAuthority(authority);
        return a;
    }
    @DeleteMapping
    public void deleteAuthority(@RequestBody Authority authority){
        authorityService.deleteAuthority(authority);
    }
}
