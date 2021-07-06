package com.internship.epayment.repository;

import com.internship.epayment.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findUsersByName(String name);

    User findUserByEmail(String email);

}
