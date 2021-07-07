package com.internship.epayment.repository;

import com.internship.epayment.entity.RoleAuthority;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleAuthorityRepository extends CrudRepository<RoleAuthority, Long> {
    @Query("select ra from RoleAuthority ra where ra.role.id =:id")
    List<RoleAuthority> findAllByRoleId(Long id);
}
