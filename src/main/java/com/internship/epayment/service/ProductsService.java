package com.internship.epayment.service;

import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import javassist.NotFoundException;

import java.util.List;

public interface ProductsService {

    List<Product> getAll();

    Product findById(Long id) throws NotFoundException;

    Product findByCode(String code) throws NotFoundException;

    Product findBySku(String sku) throws NotFoundException;

    Product addProduct(Product product);

    Product updateProduct(Product product);

    void deleteProduct(Product product);

    List<Product> order(String param, String direction);

    List<Product> filter(String column, String value);

}