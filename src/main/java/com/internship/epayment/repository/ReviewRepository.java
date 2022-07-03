package com.internship.epayment.repository;

import com.internship.epayment.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
    @Query("select ur from Review ur where ur.anunt.id =:id")
    List<Review> findReviewByAnuntId(Long id);
}
