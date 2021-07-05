package com.internship.epayment.repository;
import com.internship.epayment.entity.RoleAuthority;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RoleAuthorityRepository extends CrudRepository<RoleAuthority, Long> {

    List<RoleAuthority> findRoleAuthoritiesByEndDate(Date date);

    List<RoleAuthority> findRoleAuthoritiesByStartDate(Date date);

}
