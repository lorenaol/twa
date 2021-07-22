package com.internship.epayment.service;

import com.internship.epayment.entity.Authority;
import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuthorityService {
    Page<Authority> getAll(Pageable pageable);

    Authority findById(Long id) throws NotFoundException;

    List<Authority> findByName(String name)throws NotFoundException;

    Authority findByCode(String code) throws NotFoundException;

    Authority addAuthority(Authority authority);

    Authority updateAuthority(Authority authority);

    void deleteAuthority(Authority authority);

    List<Authority> order(String param, String direction);

    Page<Authority> filter(List<String> params, Pageable pageable);
}
