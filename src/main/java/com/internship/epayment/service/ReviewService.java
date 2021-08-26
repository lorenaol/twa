package com.internship.epayment.service;

import com.internship.epayment.entity.Review;

import java.util.List;

public interface ReviewService {

    List<Review> getAll();

    Review addReview(Review review);

    List<Review> findByProductId(Long id);

    Review updateReview(Review review);

    void deleteReview(Review review);

}
