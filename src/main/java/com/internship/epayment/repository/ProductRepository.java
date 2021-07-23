package com.internship.epayment.repository;

import com.internship.epayment.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductsByCode(String code);

    Product findProductsBySku(String sku);

    Page<Product> findById(Long id, Pageable pageable);

    Page<Product> findByCode(String code, Pageable pageable);

    Page<Product> findByName(String name, Pageable pageable);

    Page<Product> findBySku(String sku, Pageable pageable);

    Page<Product> findByIdAndCode(Long id, String code, Pageable pageable);

    Page<Product> findByIdAndName(Long id, String name, Pageable pageable);

    Page<Product> findByNameAndCode(String name, String code, Pageable pageable);

    Page<Product> findByIdAndNameAndCode(Long id, String name, String code, Pageable pageable);

    Page<Product> findBySkuAndCodeAndIdAndName(String sku, String code, Long id, String name, Pageable pageable);
}
