package com.internship.epayment.service;

import com.internship.epayment.entity.Category;
import javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    Page<Category> findAll(Pageable pageable);

    Category findById(Long id) throws NotFoundException;

    Category addCategory(Category category);

    Category updateCategory(Category category);

    void deletCategory(Category category);

    List<Category> findCategoriesByName(String name);

    List<Category> order(String param, String direction);

    Page<Category> filter(List<String> params, Pageable pageable);
}
