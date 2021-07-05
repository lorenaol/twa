package com.internship.epayment.repository;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    // @Query("select p from Product p where p.name =:nume")
    // List<Product> findProductsByName(@Param("nume") String nume);

    List<Product> findProductsByCode(String code);
    List<Product> findProductsBySku(String sku);
    List<Product> findProductsByName(String name);
}