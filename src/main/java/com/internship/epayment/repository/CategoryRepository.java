package com.internship.epayment.repository;

import com.internship.epayment.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("select c from Category c where c.categoryName =:nume")
    List<Category> findCategories2ByCategoryName(@Param("nume") String nume);

    List<Category> findCategoriesByCategoryName(String categoryName);

    Page<Category> findById(Long id, Pageable pageable);

    Page<Category> findByCategoryCode(String code, Pageable pageable);

    Page<Category> findByCategoryName(String name, Pageable pageable);

    Page<Category> findByIdAndCategoryCode(Long id, String code, Pageable pageable);

    Page<Category> findByIdAndCategoryName(Long id, String name, Pageable pageable);

    Page<Category> findByCategoryNameAndCategoryCode(String name, String code, Pageable pageable);

    Page<Category> findByIdAndCategoryNameAndCategoryCode(Long id, String name, String code, Pageable pageable);

}
