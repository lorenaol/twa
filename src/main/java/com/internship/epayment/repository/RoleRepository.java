package com.internship.epayment.repository;

import com.internship.epayment.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long>{

    List<Role> findRolesByCode(String code);

    List<Role> findRolesByName(String name);

}
