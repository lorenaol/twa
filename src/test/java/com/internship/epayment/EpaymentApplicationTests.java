package com.internship.epayment;

import com.internship.epayment.entity.Category;
import com.internship.epayment.service.CategoryService;
import javassist.NotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class EpaymentApplicationTests {

    @Autowired
    private CategoryService categoryService;

    @Test
    @BeforeAll
    public void addSomeDataTest(){
        Category category1 = new Category();
        category1.setCategoryName("Diverse 1");
        categoryService.addCategory(category1);
        Category category2 = new Category();
        category1.setCategoryName("Diverse 2");
        categoryService.addCategory(category2);
    }

    @Test
    public void findAllCategories(){
        List<Category> list = categoryService.findAll();
        assertTrue(list.size() > 0);
    }

    @Test
    public void addCategoryTest(){
        Category category = new Category();
        category.setCategoryName("Diverse 3");
        category = categoryService.addCategory(category);
        assertNull(category.getId());
    }


    @Test
    public void findByIdTest() throws NotFoundException {
        Category category = categoryService.findAll().get(0);
        assertEquals(category.getCategoryName(),"Diverse");
    }

    @Test()
    public void updateCategoryTest() throws NotFoundException {
        String newCategoryName = "Diverse 3";
        Category category = categoryService.findCategoriesByName("Diverse").get(0);
        category.setCategoryName(newCategoryName);
        category = categoryService.updateCategory(category);
        assertTrue(category.getCategoryName().equalsIgnoreCase(newCategoryName));
    }

//    @Test
//    public void deleteCategory() {
//        Category category = categoryService.findAll().get(0);
//        assertNotNull(categoryService.deleteCategory(category););
//    }

    @Test
    @AfterAll
    public void deleteAllDataTest(){
        List<Category> list = categoryService.findAll();
        for (Category category: list) {
            categoryService.deleteCategory(category);
        }
    }
}
