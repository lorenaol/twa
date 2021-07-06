package com.internship.epayment.service;


import com.internship.epayment.entity.Role;
import javassist.NotFoundException;

import java.util.List;

public interface RoleService {

    List<Role> getAll();

    Role findById(Long id) throws NotFoundException;

    List<Role> findByName(String name)throws NotFoundException;

    Role findByCode(String code) throws NotFoundException;

    Role addRole(Role role);

    Role updateRole(Role role);

    void deleteRole(Role role);
}
