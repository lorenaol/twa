package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.repository.CategoryRepository;
import com.internship.epayment.repository.ProductRepository;
import com.internship.epayment.service.CategoryService;
import com.internship.epayment.service.ProductsService;
import com.internship.epayment.service.ProductsService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductsService {

    @Autowired
    private ProductRepository productRepository;


    @Override
    public List<Product> getAll() {
        List<Product> list = new ArrayList<Product>();
        productRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Product findById(Long id) throws NotFoundException {
        Product category = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
        return  category;
    }

    @Override
    public Product findByCode(String code) {
        return productRepository.findProductsByCode(code);
    }

    @Override
    public Product findBySku(String sku) {
        return productRepository.findProductsBySku(sku);
    }

    @Override
    public Product addProduct(Product product) {
        Product p = productRepository.save(product);
        return p;
    }

    @Override
    public Product updateProduct(Product product) {
        Product p = productRepository.save(product);
        return p;
    }


    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }
}
