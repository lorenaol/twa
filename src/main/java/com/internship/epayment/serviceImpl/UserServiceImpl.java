package com.internship.epayment.serviceImpl;

import com.internship.epayment.dto.UserWithAuthoritiesDto;
import com.internship.epayment.entity.User;
import com.internship.epayment.repository.UserRepository;
import com.internship.epayment.service.UserRoleService;
import com.internship.epayment.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAll() {
        List<User> list = new ArrayList<>();
        userRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public User findById(Long id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public User findByName(String name) throws NotFoundException {
        Optional<User> user = userRepository.findUserByName(name);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + name));
        return user.get();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public UserWithAuthoritiesDto getUserWithAuthorities(String currentUserName) {
        //pas 1.getUser de pe currentUserName
        //pas 2.luam rolurile userului
        //pas 3.luam permisiunile rolurilor
        //pas 4.bagam ce ne intereseaza in dto si il returnam
    }


}

