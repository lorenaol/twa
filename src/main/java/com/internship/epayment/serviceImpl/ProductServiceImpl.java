package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Product;
import com.internship.epayment.repository.ProductRepository;
import com.internship.epayment.service.ProductsService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
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
    @Transactional
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    @Override
    public List<Product> order(String param, String direction) {
        if(direction.equals("asc")) {
            return productRepository.findAll(Sort.by(Sort.Direction.ASC, param));
            //return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, param));
        } else {
            return productRepository.findAll(Sort.by(Sort.Direction.DESC, param));
        }
    }

    @Override
    public List<Product> filter(String column, String value) {
        return null;
    }
}
