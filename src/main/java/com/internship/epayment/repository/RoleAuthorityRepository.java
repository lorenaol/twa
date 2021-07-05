package com.internship.epayment.repository;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.RoleAuthority;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.Date;
import java.util.List;
public interface RoleAuthorityRepository extends CrudRepository<RoleAuthority, Long> {
    List<RoleAuthority> findRoleAuthoritiesByEndDate(Date date);
    List<RoleAuthority> findRoleAuthoritiesByStartDate(Date date);
}
