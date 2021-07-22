package com.internship.epayment.rest;


import com.internship.epayment.entity.Role;
import com.internship.epayment.service.RoleService;
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
@RequestMapping(path = "/api/roles")
@CrossOrigin(allowedHeaders = "*")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<List<Role>> getRoles(Pageable pageable) {
        Page<Role> page = roleService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<Role>> filterRoles(@RequestHeader(name = "FILTER-PARAMS") List<String> params,
                                                  Pageable pageable) {
        Page<Role> page = roleService.filter(params, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/sort{param}")
    public List<Role> sortRoles(@PathVariable String param, @RequestParam(value = "direction") String direction) {
        return roleService.order(param, direction);
    }

    @GetMapping(path = "/{id}")
    public Role getRoleById(@PathVariable Long id) throws NotFoundException {
        return roleService.findById(id);
    }

    @GetMapping(path = "/findByName")
    public List<Role> getRolesByName(@RequestParam(value = "name") String name) throws NotFoundException {
        return roleService.findByName(name);
    }

    @GetMapping(path = "/findByCode")
    public Role getRolesByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        return roleService.findByCode(code);
    }

    @PostMapping
    public Role addRole(@RequestBody Role role) {
        Role r = null;
        if (role != null) {
            r = roleService.addRole(role);
        }
        return r;
    }

    @PutMapping
    @ResponseBody
    public Role updateRole(@RequestBody Role role) {
        return roleService.updateRole(role);
    }

    @DeleteMapping
    public void deleteRole(@RequestBody Role role) {
        roleService.deleteRole(role);
    }
}
