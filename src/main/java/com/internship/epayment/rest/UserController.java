package com.internship.epayment.rest;

import com.internship.epayment.entity.User;
import com.internship.epayment.service.UserService;
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
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(Pageable pageable) {
        Page<User> page = userService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<User>> filterUsers(@RequestHeader(name = "FILTER-PARAMS") List<String> params,
                                                  Pageable pageable) {
        Page<User> page = userService.filter(params, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/{id}")
    public User getUserById(@PathVariable Long id) throws NotFoundException {
        return userService.findById(id);
    }

    @GetMapping(path = "/findByName")
    public User getUsersByName(@RequestParam(value = "name") String name) throws NotFoundException {
        return userService.findByName(name);
    }

    @GetMapping(path = "/findByEmail")
    public User getUserByCode(@RequestParam(value = "email") String email) throws NotFoundException {
        return userService.findByEmail(email);
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        User u = null;
        if (user != null) {
            u = userService.addUser(user);
        }
        return u;
    }

    @PutMapping
    @ResponseBody
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestBody User user) {
        userService.deleteUser(user);
    }
}
