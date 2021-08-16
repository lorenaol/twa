package com.internship.epayment.service;

import com.internship.epayment.entity.Image;
import com.internship.epayment.entity.Image;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ImageService {
    List<Image> getAll();

    Image findById(Long id) throws NotFoundException;

    Image addImage(Image image);

    Image updateImage(Image image);

    void deleteImage(Image image);
}
