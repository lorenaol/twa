package com.internship.epayment.service;

import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.entity.UserRole;
import javassist.NotFoundException;

import java.util.List;

public interface UserRoleService {
    List<UserRole> getAll();

    UserRole findById(Long id) throws NotFoundException;

    UserRole addUserRole(UserRole userRole);

    UserRole updateUserRole(UserRole userRole);

    void deleteUserRole(UserRole userRole);
}
