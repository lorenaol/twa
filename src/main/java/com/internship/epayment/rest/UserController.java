package com.internship.epayment.rest;

import com.internship.epayment.entity.User;
import com.internship.epayment.repository.UserRepository;
import com.internship.epayment.service.EmailService;
import com.internship.epayment.service.UserService;
import com.internship.epayment.util.PaginationUtil;
import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        User user2 = userRepository.findUserByEmail(user.getEmail());

        if (user != null && user2 == null) {

            u = userService.addUser(user);
            emailService.sendMail(u);
        }
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Email already used");
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
    public String forgotPassword(@PathVariable String email) throws MessagingException {

        String response = userService.forgotPassword(email);
        if (response == "Invalid email id.") {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found");
        }
        User somth = userService.findByEmail(email);
        if (!response.startsWith("Invalid")) {
            emailService.sendMailFPass(somth);
            response = "http://localhost:8082/api/users/reset-password/" + response;
        }

        return response;
    }

    @PutMapping("/reset-password/{token}/{password}")
    public String resetPassword(@PathVariable String token,
                                @PathVariable String password) throws MessagingException {

        User user = userService.findByToken(token);
        String response = userService.resetPassword(token, password);
        if (response == "Invalid token.") {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid token.");
        } else {
            if (response == "Token expired.") {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token expired");
            }
        }
        if (user != null) {
            emailService.sendMailCPass(user);
        }
        return response;
    }

    @PostMapping(value = "/reset-password-logged-in")
    public Boolean resetPassword(@RequestParam(value = "initPassword") String initPassword,
                                 @RequestParam(value = "changePassword") String changePassword,
                                 @RequestParam(value = "email") String email) throws MessagingException {

        User user = userService.findByEmail(email);
        if (!passwordEncoder.matches(initPassword, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Password doesn't match! Did your forget your password?");
        } else {
            user.setPassword(changePassword);
            userService.updateUser(user);
            emailService.sendMailCPass(user);
        }
        return true;
    }

}
