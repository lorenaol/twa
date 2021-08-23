package com.internship.epayment.service;

import com.internship.epayment.entity.*;

import java.util.List;

public interface ShoppingCartService {

    List<ShoppingCart> getAll();

    ShoppingCart addShoppingCart(ShoppingCart shoppingCart);

    List<ShoppingCart> findByUserId(Long id);

    List<ShoppingCart> findByEmail(String email);

    ShoppingCart updateShoppingCart(ShoppingCart shoppingCart);

    void deleteShoppingCart(ShoppingCart shoppingCart);

}
