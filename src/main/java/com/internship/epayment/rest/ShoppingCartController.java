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
    @GetMapping(path = "/findByName")
    public List<ShoppingCart> getShoppingCartsByName(@RequestParam(value = "name") String name) throws NotFoundException {
        return  shoppingCartService.findByName(name);
    }

    @GetMapping(path = "/findProductsByName")
    public List<Product> getProductsByName(@RequestParam(value = "name") String name) throws NotFoundException {
        return  shoppingCartService.findProductsByName(name);
    }

    @GetMapping(path = "/findById")
    public List<ShoppingCart> getProductsByName(@RequestParam(value = "id") Long id) throws NotFoundException {
        return  shoppingCartService.findShoppingCartsByUserId(id);
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
