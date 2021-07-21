package com.internship.epayment.serviceImpl;

import com.internship.epayment.dto.UserWithAuthoritiesDto;
import com.internship.epayment.entity.*;
import com.internship.epayment.repository.RoleAuthorityRepository;
import com.internship.epayment.repository.UserRepository;
import com.internship.epayment.repository.UserRoleRepository;
import com.internship.epayment.service.UserRoleService;
import com.internship.epayment.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleAuthorityRepository roleAuthorityRepository;

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
    public UserWithAuthoritiesDto getUserWithAuthorities(String currentUserName) throws NotFoundException {
        //pas 1.getUser de pe currentUserName
        User user = findByName(currentUserName);

        //pas 2.luam rolurile userului
        List<Role> roles = new ArrayList<>();
        userRoleRepository.findAllByUserId(user.getId()).forEach(userRole -> roles.add(userRole.getRole()));

//        List<Role> roles = userRoleRepository.findAllByUserId(user.getId())
//                .stream().map(UserRole::getRole).collect(Collectors.toList());

        //pas 3.luam permisiunile rolurilor
        List<String> authorities = new ArrayList<>();
        roles.forEach(role -> {
            // Luam Role Authities din baza dupa id
            List<RoleAuthority> roleAuthorities = roleAuthorityRepository.findAllByRoleId(role.getId());
            // Luam Authities && Luam codurile
            roleAuthorities.forEach(roleAuthority -> {
                authorities.add(roleAuthority.getAuthority().getCode());
            });

//            authorities.addAll(
//                            roleAuthorityRepository.findAllByRoleId(role.getId())
//                            .stream().map(RoleAuthority::getAuthority).map(Authority::getCode)
//                            .collect(Collectors.toList()));
        });

        //pas 4.bagam ce ne intereseaza in dto si il returnam
        return new UserWithAuthoritiesDto(currentUserName, authorities);
    }


}

