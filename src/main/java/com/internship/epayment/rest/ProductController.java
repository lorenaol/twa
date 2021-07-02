package com.internship.epayment.rest;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.service.ProductService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getProducts(){
        List<Product> list= productService.getAll();
        return list;
    }

    @GetMapping(path = "/{id}")
    public Product getProductsById(@PathVariable Long id) throws NotFoundException {
        Product product = productService.findById(id);
        return  product;
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product){
        Product p = null;
        if(product != null){
            p = productService.addProduct(product);
        }
        return p;
    }

    @PutMapping
    @ResponseBody
    public Product updateProduct(@RequestBody Product product){
        Product p = productService.updateProduct(product);
        return p;
    }

    @DeleteMapping
    public void deleteProduct(@RequestBody Product product){
        productService.deleteProduct(product);
    }

    @GetMapping(path = "/findByName")
    public List<Product> findProductsByName(@RequestParam(value = "name") String name){
        List<Product> list = productService.findByName(name);
        return list;
    }

    @GetMapping(path = "/findByCode")
    public List<Product> findProductsByCode(@RequestParam(value = "code") String code){
        List<Product> list = productService.findByCode(code);
        return list;
    }

    @GetMapping(path = "/findBySku")
    public List<Product> findProductsBySku(@RequestParam(value = "sku") String sku){
        List<Product> list = productService.findBySku(sku);
        return list;
    }

}