package com.internship.epayment.service;

import com.internship.epayment.entity.Product;
import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductsService {

    Page<Product> getAll(Pageable pageable);

    Product findById(Long id) throws NotFoundException;

    Product findByCode(String code) throws NotFoundException;

    Product findBySku(String sku) throws NotFoundException;

    Product addProduct(Product product);

    Product updateProduct(Product product);

    void deleteProduct(Product product);

    List<Product> order(String param, String direction);

    Page<Product> filter(List<String> params, Pageable pageable);

}