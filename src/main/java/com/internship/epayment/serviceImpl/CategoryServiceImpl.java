package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Category;
import com.internship.epayment.repository.CategoryRepository;
import com.internship.epayment.service.CategoryService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Page<Category> findAll(Pageable pageable) {
        return categoryRepository.findAll(pageable);
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
        if (direction.equals("asc")) {
            return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, param));
        } else {
            return categoryRepository.findAll(Sort.by(Sort.Direction.DESC, param));
        }
    }

    @Override
    public Page<Category> filter(List<String> params, Pageable pageable) {
        String id = params.get(0);
        String name = params.get(1);
        String code = params.get(2);
        if (!id.equals("") && !name.equals("") && !code.equals("")) {
            return categoryRepository.findByIdAndCategoryNameAndCategoryCode(Long.valueOf(id), name, code, pageable);
        }
        if (!id.equals("") && !name.equals("")) {
            return categoryRepository.findByIdAndCategoryName(Long.valueOf(id), name, pageable);
        }
        if (!name.equals("") && !code.equals("")) {
            return categoryRepository.findByCategoryNameAndCategoryCode(name, code, pageable);
        }
        if (!id.equals("") && !code.equals("")) {
            return categoryRepository.findByIdAndCategoryCode(Long.valueOf(id), code, pageable);
        }
        if (!id.equals("")) {
            return categoryRepository.findById(Long.valueOf(id), pageable);
        }
        if (!name.equals("")) {
            return categoryRepository.findByCategoryName(name, pageable);
        }
        if (!code.equals("")) {
            return categoryRepository.findByCategoryCode(code, pageable);
        }
        return categoryRepository.findAll(pageable);
    }
}
