package com.internship.epayment.service;

import com.internship.epayment.entity.Category;
import javassist.NotFoundException;

import java.util.List;

public interface CategoryService {

    List<Category> findAll();

    Category findById(Long id) throws NotFoundException;

    Category addCategory(Category category);

    Category updateCategory(Category category);

    void deletCategory(Category category);

    List<Category> findCategoriesByName(String name);
}