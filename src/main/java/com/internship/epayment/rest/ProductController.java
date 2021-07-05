package com.internship.epayment.rest;

import com.internship.epayment.entity.Product;
import com.internship.epayment.service.ProductService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getProducts(){
        return productService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Product getProductsById(@PathVariable Long id) throws NotFoundException {
        return productService.findById(id);
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

    @GetMapping(path = "/findByName")
    public List<Product> findProductsByName(@RequestParam(value = "name") String name){
        return productService.findByName(name);
    }

    @GetMapping(path = "/findByCode")
    public List<Product> findProductsByCode(@RequestParam(value = "code") String code){
        return productService.findByCode(code);
    }

    @GetMapping(path = "/findBySku")
    public List<Product> findProductsBySku(@RequestParam(value = "sku") String sku){
        return productService.findBySku(sku);
    }

}