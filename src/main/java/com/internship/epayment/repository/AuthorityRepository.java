package com.internship.epayment.repository;

import com.internship.epayment.entity.Authority;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends CrudRepository<Authority, Long> {
    List<Authority> findAuthoritysByName(String name);
    Authority findAuthorityByCode(String code);
}
