package com.internship.epayment.repository;

import com.internship.epayment.entity.UserRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
    @Query("select ur from UserRole ur where ur.user.id =:id")
    List<UserRole> findAllByUserId(Long id);
}
