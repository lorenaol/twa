package com.internship.epayment.rest;

import com.internship.epayment.entity.User;
import com.internship.epayment.service.EmailService;
import com.internship.epayment.service.UserService;
import com.internship.epayment.util.PaginationUtil;
import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

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

    @GetMapping(path = "/reset-password/{token}")
    public User getUsersByToken(@PathVariable String token) throws NotFoundException {
        return userService.findByToken(token);
    }

    @GetMapping(path = "/findByEmail")
    public User getUserByCode(@RequestParam(value = "email") String email) throws MessagingException {
        return userService.findByEmail(email);
    }

    @PostMapping
    public User addUser(@RequestBody User user) throws MessagingException {
        User u = null;
        if (user != null) {
            u = userService.addUser(user);
            // TO DO emailService.sendEmail

            emailService.sendMail(u) ;
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

    @SneakyThrows
    @PostMapping("/forgot-password/{email}")
    public String forgotPassword(@PathVariable String email) throws MessagingException{

        String response = userService.forgotPassword(email);
        User somth = userService.findByEmail(email);
        emailService.sendMailFPass(somth);
        if (!response.startsWith("Invalid")) {
            response = "http://localhost:8082/api/users/reset-password/" + response;
        }

        return response;
    }

    @PutMapping("/reset-password/{token}/{password}")
    public String resetPassword(@PathVariable String token,
                                @PathVariable String password)  throws MessagingException{

        User somth = userService.findByToken(token);
        //System.out.println(somth.getName());
        emailService.sendMailCPass(somth);
        return userService.resetPassword(token, password);
    }

}
