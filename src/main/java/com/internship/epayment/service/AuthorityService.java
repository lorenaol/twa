package com.internship.epayment.service;

import com.internship.epayment.entity.Authority;
import javassist.NotFoundException;

import java.util.List;

public interface AuthorityService {

    Authority updateAuthority(Authority authority);

    List<Authority> getAll();

    Authority findById(Long id) throws NotFoundException;

    Authority addAuthority(Authority authority);

    void deleteAuthority(Authority authority);

    List<Authority> findByName(String name);

    List<Authority> findByCode(String code);
}
