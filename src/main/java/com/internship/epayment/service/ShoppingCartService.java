package com.internship.epayment.service;

import com.internship.epayment.entity.*;

import java.util.List;

public interface ShoppingCartService {

    List<ShoppingCart> getAll();

    ShoppingCart addShoppingCart(ShoppingCart shoppingCart);

    List<ShoppingCart> findByName(String name);

    List<Product> findProductsByName(String name);

    List<ShoppingCart> findShoppingCartsByUserId(Long id);

    ShoppingCart updateShoppingCart(ShoppingCart shoppingCart);

    void deleteShoppingCart(ShoppingCart shoppingCart);

}
