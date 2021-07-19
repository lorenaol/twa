package com.internship.epayment.repository;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long>, JpaRepository<Category, Long> {

    @Query("select c from Category c where c.categoryName =:nume")
    List<Category> findCategories2ByCategoryName(@Param("nume") String nume);

    List<Category> findCategoriesByCategoryName(String categoryName);
}
