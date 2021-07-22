package com.internship.epayment.rest;

import com.internship.epayment.entity.Category;
import com.internship.epayment.service.CategoryService;
import com.internship.epayment.util.PaginationUtil;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getCategories(Pageable pageable){
        Page<Category> page = categoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<Category>> filterCategories(@RequestHeader(name = "FILTER-PARAMS") List<String> params,
                                                           Pageable pageable ) throws NotFoundException {
        Page<Category> page = categoryService.filter(params, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/{id}")
    public Category getCategoriesById(@PathVariable Long id) throws NotFoundException {
        return  categoryService.findById(id);
    }

    @GetMapping(path = "/sort{param}")
    public List<Category> sortCategories(@PathVariable String param, @RequestParam(value = "direction") String direction) throws NotFoundException {
        return categoryService.order(param, direction);
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
