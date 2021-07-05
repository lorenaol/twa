package com.internship.epayment.service;

import com.internship.epayment.entity.Authority;
import javassist.NotFoundException;

import java.util.List;

public interface AuthorityService {

    List<Authority> getAll();

    Authority findById(Long id) throws NotFoundException;

    List<Authority> findByName(String name)throws NotFoundException;

    Authority findByCode(String code) throws NotFoundException;

    Authority addAuthority(Authority authority);

    Authority updateAuthority(Authority authority);

    void deleteAuthority(Authority authority);
}