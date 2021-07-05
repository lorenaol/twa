package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.repository.AuthorityRepository;
import com.internship.epayment.service.AuthorityService;
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
        List<Authority> list = new ArrayList<>();
        authorityRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Authority findById(Long id) throws NotFoundException {
       return authorityRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public List<Authority> findByName(String name) throws NotFoundException {
        return authorityRepository.findAuthoritysByName(name);
    }

    @Override
    public Authority findByCode(String code) throws NotFoundException {
        return authorityRepository.findAuthorityByCode(code);
    }

    @Override
    @Transactional
    public Authority addAuthority(Authority authority) {
        return authorityRepository.save(authority);
    }

    @Override
    @Transactional
    public Authority updateAuthority(Authority authority) {
        return authorityRepository.save(authority);
    }

    @Override
    @Transactional
    public void deleteAuthority(Authority authority) {
        authorityRepository.delete(authority);
    }
}
