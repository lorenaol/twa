package com.internship.epayment.repository;

import com.internship.epayment.entity.Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {
    List<Image> findAllById(Long id);
    

}
