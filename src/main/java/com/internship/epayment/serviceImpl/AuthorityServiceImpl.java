package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.entity.Role;
import com.internship.epayment.repository.AuthorityRepository;
import com.internship.epayment.service.AuthorityService;
import javassist.NotFoundException;
import liquibase.pro.packaged.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

    @Override
    public List<Authority> order(String param, String direction) {
        if(direction.equals("asc")) {
            return authorityRepository.findAll(Sort.by(Sort.Direction.ASC, param));
        } else {
            return authorityRepository.findAll(Sort.by(Sort.Direction.DESC, param));
        }
    }

    @Override
    public List<Authority> filter(String column, String value) {
        List<Authority> authorities = authorityRepository.findAll();
        List<Authority> result = new ArrayList<>();
        for (Authority authority : authorities) {
            if(column.equals("name")) {
                if(authority.getName().equals(value)) {
                    result.add(authority);
                }
            } else if(column.equals("code")) {
                if(authority.getCode().equals(value)) {
                    result.add(authority);
                }
            } else if(column.equals("id")) {
                if(authority.getId().toString().equals(value)) {
                    result.add(authority);
                }
            } else if(column.equals("startDate")) {
                if(authority.getStartDate().toString().equals(value)) {
                    result.add(authority);
                }
            } else if(column.equals("endDate")) {
                if(authority.getEndDate().toString().equals(value)) {
                    result.add(authority);
                }
            }

        }
        return result;
    }
}
