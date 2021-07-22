package com.internship.epayment.rest;


import com.internship.epayment.entity.Product;
import com.internship.epayment.service.ProductsService;
import com.internship.epayment.util.PaginationUtil;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    @Autowired
    private ProductsService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(Pageable pageable) {
        Page<Product> page = productService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<Product>> filterProducts(@RequestHeader(name = "FILTER-PARAMS") List<String> params,
                                                        Pageable pageable) {
        Page<Product> page = productService.filter(params, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/{id}")
    public Product getProductById(@PathVariable Long id) throws NotFoundException {
        return productService.findById(id);
    }

    @GetMapping(path = "/sort{param}")
    public List<Product> sortProducts(@PathVariable String param, @RequestParam(value = "direction") String direction) {
        return productService.order(param, direction);
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
    public Product addProduct(@RequestBody Product product) {
        Product p = null;
        if (product != null) {
            p = productService.addProduct(product);
        }
        return p;
    }

    @PutMapping
    @ResponseBody
    public Product updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

    @DeleteMapping
    public void deleteProduct(@RequestBody Product product) {
        productService.deleteProduct(product);
    }
}
