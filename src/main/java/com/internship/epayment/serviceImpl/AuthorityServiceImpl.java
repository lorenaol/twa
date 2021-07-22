package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.repository.AuthorityRepository;
import com.internship.epayment.service.AuthorityService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Page<Authority> getAll(Pageable pageable) {
        return authorityRepository.findAll(pageable);
    }

    @Override
    public Authority findById(Long id) throws NotFoundException {
       return authorityRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public List<Authority> findByName(String name) throws NotFoundException {
        return authorityRepository.findAuthoritisByName(name);
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
    public Page<Authority> filter(List<String> params, Pageable pageable) {
        String id = params.get(0);
        String name = params.get(1);
        String code = params.get(2);
        if(!id.equals("") && !name.equals("") && !code.equals("")) {
            return authorityRepository.findByIdAndNameAndCode(Long.valueOf(id),name, code, pageable);
        }
        if(!id.equals("") && !name.equals("")) {
            return authorityRepository.findByIdAndName(Long.valueOf(id),name, pageable);
        }
        if(!name.equals("") && !code.equals("")) {
            return authorityRepository.findByNameAndCode(name, code, pageable);
        }
        if(!id.equals("") && !code.equals("")) {
            return authorityRepository.findByIdAndCode(Long.valueOf(id), code, pageable);
        }
        if(!id.equals("")) {
            return authorityRepository.findById(Long.valueOf(id), pageable);
        }
        if(!name.equals("")) {
            return authorityRepository.findByName(name, pageable);
        }
        if(!code.equals("")) {
            return authorityRepository.findByCode(code, pageable);
        }
        return authorityRepository.findAll(pageable);
    }
}
