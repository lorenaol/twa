package com.internship.epayment.repository;


import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Role;
import liquibase.pro.packaged.L;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    List<Role> findRolesByName(String name);
    List<Role> findRolesById(Long id);
    Role findRoleByCode(String code);
    Page<Role> findRolesByCode(String code, Pageable pageable);
    List<Role> findRolesByStartDate(Date startDate);
    List<Role> findRolesByEndDate(Date endDate);
}
