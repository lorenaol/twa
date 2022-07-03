package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Image;
import com.internship.epayment.entity.Product;
import com.internship.epayment.repository.CategoryRepository;
import com.internship.epayment.repository.ImageRepository;
import com.internship.epayment.repository.ProductRepository;
//import com.internship.epayment.service.EmailService;
import com.internship.epayment.service.ProductsService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductsService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ImageRepository imageRepository;


    @Override
    public Page<Product> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
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
       int i;
       Product p = productRepository.save(product);

       for(i = 0; i < product.getImages().size(); i++)
       {
            Image im = product.getImages().get(i);
            im.setProduct(p);
            imageRepository.save(im);

       }
        return p;
    }

    @Override
    @Transactional
    public Product updateProduct(Product product) {
        int i;
        Product p = productRepository.save(product);
        for(i = 0; i < product.getImages().size(); i++)
        {
            Image im = product.getImages().get(i);
            if(product.getImages().get(i).getId() == null){
                im.setProduct(p);
                imageRepository.save(im);
            }
            else
                imageRepository.delete(im);

        }
        return p;
    }

    @Override
    @Transactional
    public void deleteProduct(Product product) {
        int i;
        for(i = 0; i < product.getImages().size(); i++){
            Image im = product.getImages().get(i);
            imageRepository.delete(im);
        }
        productRepository.delete(product);
    }


    @Override
    public List<Product> order(String param, String direction) {
        if (direction.equals("asc")) {
            return productRepository.findAll(Sort.by(Sort.Direction.ASC, param));
        } else {
            return productRepository.findAll(Sort.by(Sort.Direction.DESC, param));
        }
    }

    @Override
    public Page<Product> filter(List<String> params, Pageable pageable) {
        String id = params.get(0);
        String name = params.get(1);
        String code = params.get(2);
        String sku = params.get(3);

        if (!id.equals("")) {
            return productRepository.findById(Long.valueOf(id), pageable);
        }
//        if (!id.equals("") && !name.equals("") && !code.equals("") && !sku.equals("")) {
//            return productRepository.findBySkuAndCodeAndIdAndName(sku, code, Long.valueOf(id), name, pageable);
//        }
        if (!sku.equals("") && !name.equals("") && !code.equals("")) {
            return productRepository.findBySkuAndNameAndCode(sku, name, code, pageable);
        }
        if (!sku.equals("") && !name.equals("")) {
            return productRepository.findBySkuAndName(sku, name, pageable);
        }
        if (!name.equals("") && !code.equals("")) {
            return productRepository.findByNameAndCode(name, code, pageable);
        }
        if (!sku.equals("") && !code.equals("")) {
            return productRepository.findBySkuAndCode(sku, code, pageable);
        }
//        if (!name.equals("")) {
//            return productRepository.findByName(name, pageable);
//        }
        if(!name.equals("")){
            return productRepository.findProductsByName(name,pageable);
        }
        if (!sku.equals("")) {
            return productRepository.findBySku(sku, pageable);
        }
        if (!code.equals("")) {
            return productRepository.findByCode(code, pageable);
        }
        return productRepository.findAll(pageable);
    }
}
