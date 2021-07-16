package com.internship.epayment.rest;
import com.internship.epayment.entity.User;
import com.internship.epayment.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers(){
        return userService.getAll();
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
    public User addUser(@RequestBody User user){
        User u = null;
        if(user != null){
            u = userService.addUser(user);
        }
        return u;
    }

    @PutMapping
    @ResponseBody
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestBody User user){
        userService.deleteUser(user);
    }

}
