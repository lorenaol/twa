package com.internship.epayment.service;

import com.internship.epayment.entity.Role;
import javassist.NotFoundException;

import java.util.List;

public interface RoleService {

    List<Role> getAll();

    Role findById(Long id) throws NotFoundException;

    List<Role>findByCode(String code);

    Role addRole(Role role);

    Role updateRole(Role role);

    List<Role> findByName(String name);

    void deleteRole(Role role);


}
