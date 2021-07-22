package com.internship.epayment.repository;

import com.internship.epayment.entity.Authority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    List<Authority> findAuthoritisByName(String name);

    Authority findAuthorityByCode(String code);

    Page<Authority> findById(Long id, Pageable pageable);

    Page<Authority> findByCode(String code, Pageable pageable);

    Page<Authority> findByName(String name, Pageable pageable);

    Page<Authority> findByIdAndCode(Long id, String code, Pageable pageable);

    Page<Authority> findByIdAndName(Long id, String name, Pageable pageable);

    Page<Authority> findByNameAndCode(String name, String code, Pageable pageable);

    Page<Authority> findByIdAndNameAndCode(Long id, String name, String code, Pageable pageable);
}
