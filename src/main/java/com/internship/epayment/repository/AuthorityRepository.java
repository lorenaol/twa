package com.internship.epayment.repository;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.Authority;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends CrudRepository<Authority, Long> {
    List<Authority> findAuthoritiesByCode(String code);
    //List<Product> findAuthoritiesBySku(String sku);
    List<Authority> findAuthoritiesByName(String name);

}
