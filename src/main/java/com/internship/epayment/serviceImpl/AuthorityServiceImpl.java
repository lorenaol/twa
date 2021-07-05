package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.repository.AuthorityRepository;
import com.internship.epayment.service.AuthorityService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return authorityRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public List<Authority> findByCode(String code) {
        return authorityRepository.findAuthoritiesByCode(code);
    }

    @Override
    public Authority addAuthority(Authority authority) {
        return authorityRepository.save(authority);
    }

    @Override
    public Authority updateAuthority(Authority authority) {
        return authorityRepository.save(authority);
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
