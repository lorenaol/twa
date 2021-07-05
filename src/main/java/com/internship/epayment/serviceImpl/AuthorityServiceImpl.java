package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Authority;
import com.internship.epayment.repository.CategoryRepository;
import com.internship.epayment.repository.AuthorityRepository;
import com.internship.epayment.repository.ProductRepository;
import com.internship.epayment.service.CategoryService;
import com.internship.epayment.service.AuthorityService;
import com.internship.epayment.service.ProductService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {
    @Autowired
    private AuthorityRepository authorityRepository;


    @Override
    public List<Authority> getAll() {
        List<Authority> list = new ArrayList<Authority>();
        authorityRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Authority findById(Long id) throws NotFoundException {
        Authority category = authorityRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
        return  category;
    }

    @Override
    public List<Authority> findByCode(String code) {
        return authorityRepository.findAuthoritiesByCode(code);
    }

    @Override
    public Authority addAuthority(Authority authority) {
        Authority p = authorityRepository.save(authority);
        return p;
    }

    @Override
    public Authority updateAuthority(Authority authority) {
        Authority p = authorityRepository.save(authority);
        return p;
    }

    @Override
    public List<Authority> findByName(String name) {
        return authorityRepository.findAuthoritiesByName(name);
    }

    @Override
    public void deleteAuthority(Authority authority) {
        authorityRepository.delete(authority);
    }
}
