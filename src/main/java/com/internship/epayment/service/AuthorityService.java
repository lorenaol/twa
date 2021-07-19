package com.internship.epayment.service;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.entity.Role;
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

    List<Authority> order(String param, String direction);

    List<Authority> filter(String column, String value);
}
