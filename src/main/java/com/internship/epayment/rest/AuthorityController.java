package com.internship.epayment.rest;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.service.AuthorityService;
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
    public List<Authority> getRoles(){
        return authorityService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Authority getAuthoritiesById(@PathVariable Long id) throws NotFoundException {
        return authorityService.findById(id);
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
        return authorityService.updateAuthority(authority);
    }

    @DeleteMapping
    public void deleteAuthority(@RequestBody Authority authority){
        authorityService.deleteAuthority(authority);
    }

    @GetMapping(path = "/findByName")
    public List<Authority> findAuthoritiesByName(@RequestParam(value = "name") String name){
        return authorityService.findByName(name);
    }

    @GetMapping(path = "/findByCode")
    public List<Authority> findAuthoritiesByCode(@RequestParam(value = "code") String code){
        return authorityService.findByCode(code);
    }


}
