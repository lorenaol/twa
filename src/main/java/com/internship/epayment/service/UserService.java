package com.internship.epayment.service;

import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.User;
import javassist.NotFoundException;

import java.util.List;

public interface UserService {

    List<User> getAll();

    User findById(Long id) throws NotFoundException;

    User findByName(String name)throws NotFoundException;

    User findByEmail(String code) throws NotFoundException;

    User addUser(User user);

    User updateUser(User user);

    void deleteUser(User user);

    /*List<User> order(String param, String direction);

    List<User> filter(String column, String value);*/
}

