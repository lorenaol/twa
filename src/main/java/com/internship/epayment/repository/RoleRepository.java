package com.internship.epayment.repository;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import java.util.List;


public interface RoleRepository extends CrudRepository<Role, Long>{
    List<Role> findRolesByCode(String code);
    //List<Product> findRolesBySku(String sku);
    List<Role> findRolesByName(String name);

}
