package com.internship.epayment.service;


import com.internship.epayment.entity.Role;
import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface RoleService {

    Page<Role> getAll(Pageable pageable);

    Role findById(Long id) throws NotFoundException;

    List<Role> findByName(String name)throws NotFoundException;

    Role findByCode(String code) throws NotFoundException;

    Role addRole(Role role);

    Role updateRole(Role role);

    void deleteRole(Role role);

    List<Role> order(String param, String direction);

    Page<Role> filter(List<String> params, Pageable pageable);

}
