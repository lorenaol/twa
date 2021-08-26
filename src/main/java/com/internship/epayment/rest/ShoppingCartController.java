package com.internship.epayment.rest;

import com.internship.epayment.entity.*;
import com.internship.epayment.service.ShoppingCartService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/shoppingcart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping
    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCartService.getAll();
    }

    @PostMapping
    public ShoppingCart addShoppingCart(@RequestBody ShoppingCart shoppingCart) {
        ShoppingCart s = null;
        if (shoppingCart != null) {
            s = shoppingCartService.addShoppingCart(shoppingCart);
        }
        return s;
    }

    @GetMapping(path = "/findByUserId")
    public List<ShoppingCart> getShoppingCartsByUserId(@RequestParam(value = "id") Long id) throws NotFoundException {
        return  shoppingCartService.findByUserId(id);
    }

    @GetMapping(path = "/findByEmail")
    public List<ShoppingCart> getShoppingCartsByName(@RequestParam(value = "email") String email) throws NotFoundException {
        return  shoppingCartService.findByEmail(email);
    }

    @PutMapping
    @ResponseBody
    public ShoppingCart updateShoppingCart(@RequestBody ShoppingCart shoppingCart) {
        return shoppingCartService.updateShoppingCart(shoppingCart);
    }

    @DeleteMapping
    public void deleteShoppingCart(@RequestBody ShoppingCart shoppingCart) {
        shoppingCartService.deleteShoppingCart(shoppingCart);
    }

}
