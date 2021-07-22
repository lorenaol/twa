package com.internship.epayment.rest;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.service.AuthorityService;
import com.internship.epayment.util.PaginationUtil;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/authorities")
public class AuthorityController {

    @Autowired
    private AuthorityService authorityService;

    @GetMapping
    public ResponseEntity<List<Authority>> getAuthorities(Pageable pageable){
        Page<Authority> page = authorityService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/sort{param}")
    public List<Authority> sortAuthorities(@PathVariable String param,
                                           @RequestParam(value = "direction") String direction) throws NotFoundException {
        return authorityService.order(param, direction);
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<Authority>> filterRoles(@RequestHeader(name = "FILTER-PARAMS") List<String> params,
                                                       Pageable pageable ) throws NotFoundException {
        Page<Authority> page = authorityService.filter(params, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
