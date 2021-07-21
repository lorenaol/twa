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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
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
    public Page<User> filter(List<String> params, Pageable pageable) {
        String id = params.get(0);
        String name = params.get(1);
        String email = params.get(2);
        if(!id.equals("") && !name.equals("") && !email.equals("")) {
            return userRepository.findByNameAndEmailAndId(name, email, Long.valueOf(id), pageable);
        }
        if(!id.equals("") && !name.equals("")) {
            return userRepository.findByIdAndName(Long.valueOf(id), name, pageable);
        }
        if(!name.equals("") && !email.equals("")) {
            return userRepository.findByNameAndEmail(name, email, pageable);
        }
        if(!id.equals("") && !email.equals("")) {
            return userRepository.findByIdAndEmail(Long.valueOf(id), email, pageable);
        }
        if(!id.equals("")) {
            return userRepository.findById(Long.valueOf(id), pageable);
        }
        if(!name.equals("")) {
            return userRepository.findByName(name, pageable);
        }
        if(!email.equals("")) {
            return userRepository.findByEmail(email, pageable);
        }
        return userRepository.findAll(pageable);
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

