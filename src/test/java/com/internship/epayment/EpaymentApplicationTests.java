package com.internship.epayment;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.User;
import com.internship.epayment.service.CategoryService;
import com.internship.epayment.service.UserService;
import javassist.NotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class EpaymentApplicationTests {

    @Autowired
    private UserService userService;

    @Test
    @BeforeAll
    public void addDataTest(){
        User user1 = new User();
        user1.setEmail("lorenaolescu@gmail.com");
        user1.setAddress("Bucuresti");
        userService.addUser(user1);
        User user2 = new User();
        user2.setEmail("anamaria@gmail.com");
        user2.setStart_date(new Date());
        userService.addUser(user2);
    }

    @Test
    public void findAllUsers(){
//        List<User> list = userService.getAll();
//        assertTrue(list.size() > 0);
    }




    @Test
    public void addCategoryTest(){
        Category category = new Category();
        category.setCategoryName("Diverse 3");
        category = categoryService.addCategory(category);
        assertNull(category.getId());
    }

//
//    @Test
//    public void findByIdTest() throws NotFoundException {
//        Category category = categoryService.findAll().get(0);
//        assertEquals(category.getCategoryName(),"Diverse");
//    }

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

//    @Test
//    @AfterAll
//    public void deleteAllDataTest(){
//        List<Category> list = categoryService.findAll();
//        for (Category category: list) {
//            categoryService.deleteCategory(category);
//        }
//    }
}
