package com.internship.epayment.rest;

import com.internship.epayment.entity.Review;
import com.internship.epayment.service.ReviewService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<Review> getReviews() {
        return reviewService.getAll();
    }

    @PostMapping
    public Review addReview (@RequestBody Review review) {
        Review r = null;
        if (review != null) {
            r = reviewService.addReview(review);
        }
        return r;
    }

    @GetMapping(path = "/findByProductId")
    public List<Review> getReviewsByProductId(@RequestParam(value = "id") Long id) throws NotFoundException {
        return  reviewService.findByAnuntId(id);
    }

    @PutMapping
    @ResponseBody
    public Review updateReview(@RequestBody Review review) {
        return reviewService.updateReview(review);
    }

    @DeleteMapping
    public void deleteReview(@RequestBody Review review) {
        reviewService.deleteReview(review);
    }
}
