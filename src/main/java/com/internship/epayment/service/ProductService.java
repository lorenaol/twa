package com.internship.epayment.service;

import com.internship.epayment.entity.Product;
import javassist.NotFoundException;

import java.util.List;

public interface ProductService {

    List<Product> getAll();

    Product findById(Long id) throws NotFoundException;

    List<Product>findByCode(String code);

    List<Product> findBySku(String sku);

    Product addProduct(Product product);

    Product updateProduct(Product product);

    List<Product> findByName(String name);

    void deleteProduct(Product product);

}