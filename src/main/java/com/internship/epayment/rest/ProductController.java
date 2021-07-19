package com.internship.epayment.rest;


import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.service.ProductsService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    @Autowired
    private ProductsService productService;

    @GetMapping
    public List<Product> getProducts(){
        return productService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Product getProductById(@PathVariable Long id) throws NotFoundException {
        return productService.findById(id);
    }

    @GetMapping(path = "/sort{param}")
    public List<Product> sortProducts(@PathVariable String param, @RequestParam(value = "direction") String direction) throws NotFoundException {
        return productService.order(param, direction);
    }

    @GetMapping(path = "/filterBy{param}/=/{param2}")
    public List<Product> filterProducts(@PathVariable String param, @PathVariable String param2) throws NotFoundException {
        return productService.filter(param, param2);
    }


    @GetMapping(path = "/findByCode")
    public Product getProductsByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        return productService.findByCode(code);
    }

    @GetMapping(path = "/findBySku")
    public Product getProductsBySku(@RequestParam(value = "sku") String sku) throws NotFoundException {
        return productService.findBySku(sku);
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
        return productService.updateProduct(product);
    }

    @DeleteMapping
    public void deleteProduct(@RequestBody Product product){
        productService.deleteProduct(product);
    }
}
