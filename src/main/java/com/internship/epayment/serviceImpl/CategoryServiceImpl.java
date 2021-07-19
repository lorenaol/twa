package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.entity.Category;
import com.internship.epayment.repository.CategoryRepository;
import com.internship.epayment.service.CategoryService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

    @Override
    public List<Category> order(String param, String direction) {
        if(direction.equals("asc")) {
            return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, param));
            //return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, param));
        } else {
            return categoryRepository.findAll(Sort.by(Sort.Direction.DESC, param));
        }
    }

    @Override
    public List<Category> filter(String column, String value) {
        List<Category> categories = categoryRepository.findAll();
        List<Category> result = new ArrayList<>();
        for (Category category:categories) {
            if(column.equals("name")) {
                if(category.getCategoryName().equals(value)) {
                    result.add(category);
                }
            } else if(column.equals("code")) {
                if(category.getCategoryCode().equals(value)) {
                    result.add(category);
                }
            } else if(column.equals("id")) {
                if(category.getId().toString().equals(value)) {
                    result.add(category);
                }
            } else if(column.equals("description")) {
                if(category.getCategoryDescription().equals(value)) {
                    result.add(category);
                }
            } else if(column.equals("dateAdded")) {
                if(category.getDateAdded().toString().equals(value)) {
                    result.add(category);
                }
            } else if(column.equals("storeId")) {
                if(category.getStoreId().equals(value)) {
                    result.add(category);
                }
            }

        }
        return result;
    }
}
