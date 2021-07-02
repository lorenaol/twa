package com.internship.epayment.service;

import com.internship.epayment.entity.Product;
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

}