package com.internship.epayment.repository;

import com.internship.epayment.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByName(String name);

    User findUserByEmail(String email);

    User findUserByToken(String token);

    Page<User> findById(Long id, Pageable pageable);

    Page<User> findByName(String name, Pageable pageable);

    Page<User> findByEmail(String email, Pageable pageable);

    Page<User> findByIdAndName(Long id, String name, Pageable pageable);

    Page<User> findByIdAndEmail(Long id, String email, Pageable pageable);

    Page<User> findByNameAndEmail(String name, String email, Pageable pageable);

    Page<User> findByNameAndEmailAndId(String name, String email, Long id, Pageable pageable);
}
