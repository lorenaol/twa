package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.UserRole;
import com.internship.epayment.repository.UserRoleRepository;
import com.internship.epayment.service.UserRoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserRoleServiceImpl implements UserRoleService {
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public List<UserRole> getAll() {
        List<UserRole> list = new ArrayList<>();
        userRoleRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public UserRole findById(Long id) throws NotFoundException {
        UserRole userRole = userRoleRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
        return userRole;
    }

    @Transactional
    public UserRole addUserRole(UserRole userRole) {
        UserRole r = userRoleRepository.save(userRole);
        return r;
    }

    @Override
    @Transactional
    public UserRole updateUserRole(UserRole role) {
        UserRole r = userRoleRepository.save(role);
        return r;
    }


    @Override
    @Transactional
    public void deleteUserRole(UserRole role) {
        userRoleRepository.delete(role);
    }

}
