package com.internship.epayment.repository;

import com.internship.epayment.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Page<Role> findByName(String name, Pageable pageable);

    Page<Role> findById(Long id, Pageable pageable);

    Page<Role> findByNameAndCode(String name, String code, Pageable pageable);

    Page<Role> findByNameAndId(String name, Long Id, Pageable pageable);

    Page<Role> findByIdAndCode(Long id, String code, Pageable pageable);

    Page<Role> findByNameAndIdAndCode(String name, Long Id, String code, Pageable pageable);

    List<Role> findRolesByName(String name);

    List<Role> findRolesById(Long id);

    Role findRoleByCode(String code);

    Page<Role> findRolesByCode(String code, Pageable pageable);

    List<Role> findRolesByStartDate(Date startDate);

    List<Role> findRolesByEndDate(Date endDate);
}
