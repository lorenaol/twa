package com.internship.epayment.rest;

import com.internship.epayment.entity.Category;
import com.internship.epayment.service.CategoryService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getCategories(){
        //branza
        return  categoryService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Category getCategoriesById(@PathVariable Long id) throws NotFoundException {
        return  categoryService.findById(id);
    }

    @PostMapping
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
        return categoryService.updateCategory(category);
    }

    @DeleteMapping
    public void deleteCategory(@RequestBody Category category){
            categoryService.deletCategory(category);
    }

    @GetMapping(path = "/findByName")
    public List<Category> getCategoriesByName(@RequestParam(value = "name") String name){
        return  categoryService.findCategoriesByName(name);
    }

}
