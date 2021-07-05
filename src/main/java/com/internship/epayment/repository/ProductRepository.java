package com.internship.epayment.repository;

import com.internship.epayment.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    Product findProductsByCode(String code);
    Product findProductsBySku(String sku);
}