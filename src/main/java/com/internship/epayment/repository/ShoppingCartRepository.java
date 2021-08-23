package com.internship.epayment.repository;

import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    List<ShoppingCart> findShoppingCartsByUserId(Long id);
}
