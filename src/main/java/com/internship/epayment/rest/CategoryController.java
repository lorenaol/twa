package com.internship.epayment.rest;

import com.internship.epayment.entity.Category;
import com.internship.epayment.service.CategoryService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@Controller
@RequestMapping(path = "/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getCategories(){
        List<Category> list= categoryService.findAll();
        return list;
    }

    @GetMapping(path = "/{id}")
    public Category getCategoriesById(@PathVariable Long id) throws NotFoundException {
        Category category = categoryService.findById(id);
        return  category;
    }

    @PostMapping
//    @ResponseBody
    public Category addCategory(@RequestBody Category category){
        Category c = null;
        if(category != null){
            c = categoryService.addCategory(category);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Category updateCategory(@RequestBody Category category){
        Category c = categoryService.updateCategory(category);
        return c;
    }

    @DeleteMapping
    public void deleteCategory(@RequestBody Category category){
            categoryService.deletCategory(category);
    }

    @GetMapping(path = "/findByName")
    public List<Category> getCategoriesByName(@RequestParam(value = "name") String name){
        List<Category> list = categoryService.findCategoriesByName(name);
        return list;
    }

}
