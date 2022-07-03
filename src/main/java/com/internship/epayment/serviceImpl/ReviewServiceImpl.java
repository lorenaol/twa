package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Review;
import com.internship.epayment.repository.ReviewRepository;
import com.internship.epayment.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> findByAnuntId(Long id) {
        return reviewRepository.findReviewByAnuntId(id);
    }

    @Override
    public Review updateReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Review review) {
        reviewRepository.delete(review);
    }
}
