package com.internship.epayment.rest;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.entity.Role;
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
    public List<Authority> getAuthorities(){
        return  authorityService.getAll();
    }

    @GetMapping(path = "/sort{param}")
    //@GetMapping
    public List<Authority> sortAuthorities(@PathVariable String param, @RequestParam(value = "direction") String direction) throws NotFoundException {
        return authorityService.order(param, direction);
    }

    @GetMapping(path = "/filterBy{param}/=/{param2}")
    public List<Authority> filterAuthorities(@PathVariable String param, @PathVariable String param2) throws NotFoundException {
        return authorityService.filter(param, param2);
    }

    @GetMapping(path = "/{id}")
    public Authority getAuthorityById(@PathVariable Long id) throws NotFoundException {
        return authorityService.findById(id);
    }

    @GetMapping(path = "/findByName")
    public List<Authority> getAuthoritiesByName(@RequestParam(value = "name") String name) throws NotFoundException {
        return  authorityService.findByName(name);
    }

    @GetMapping(path = "/findByCode")
    public Authority getAuthorityByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        return authorityService.findByCode(code);
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
        return authorityService.updateAuthority(authority);
    }
    @DeleteMapping
    public void deleteAuthority(@RequestBody Authority authority){
        authorityService.deleteAuthority(authority);
    }
}
