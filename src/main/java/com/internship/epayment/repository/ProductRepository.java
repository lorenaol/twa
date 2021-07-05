package com.internship.epayment.repository;

import com.internship.epayment.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    List<Product> findProductsByCode(String code);

    List<Product> findProductsBySku(String sku);

    List<Product> findProductsByName(String name);
}