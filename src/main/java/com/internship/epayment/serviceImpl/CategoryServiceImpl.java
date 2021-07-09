package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Category;
import com.internship.epayment.repository.CategoryRepository;
import com.internship.epayment.service.CategoryService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        List<Category> list = new ArrayList<Category>();
        categoryRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Category findById(Long id) throws NotFoundException {
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    @Transactional
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deletCategory(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public List<Category> findCategoriesByName(String name) {
        return categoryRepository.findCategoriesByCategoryName(name);
    }
}
