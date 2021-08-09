package com.internship.epayment.service;

import com.internship.epayment.dto.UserWithAuthoritiesDto;
import com.internship.epayment.entity.User;
import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.mail.MessagingException;
import java.util.List;

public interface UserService {
    Page<User> getAll(Pageable pageable);

    User findById(Long id) throws NotFoundException;

    User findByName(String name)throws NotFoundException;

    User findByEmail(String code) throws MessagingException;

    User addUser(User user);

    User updateUser(User user);

    void deleteUser(User user);

    String forgotPassword(String email);

    String resetPassword(String token, String password);


    UserWithAuthoritiesDto getUserWithAuthorities(String currentUserName) throws NotFoundException;

    Page<User> filter(List<String> params, Pageable pageable);

    User findByToken(String token);
}

