package com.internship.epayment.rest;


import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.service.ProductsService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@Controller
@RequestMapping(path = "/api/products")
public class ProductController {

    @Autowired
    private ProductsService productService;

    @GetMapping
    public List<Product> getProducts(){
        List<Product> list= productService.getAll();
        return list;
    }

    @GetMapping(path = "/{id}")
    public Product getProductById(@PathVariable Long id) throws NotFoundException {
        Product product = productService.findById(id);
        return  product;
    }

    @GetMapping(path = "/findByCode")
    public Product getProductsByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        Product product = productService.findByCode(code);
        return product;
    }

    @GetMapping(path = "/findBySku")
    public Product getProductsBySku(@RequestParam(value = "sku") String sku) throws NotFoundException {
        Product product = productService.findBySku(sku);
        return product;
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
}
