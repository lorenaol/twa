package com.internship.epayment.repository;

import com.internship.epayment.entity.RoleAuthority;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleAuthorityRepository extends CrudRepository<RoleAuthority, Long> {

}
