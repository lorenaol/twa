package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Image;
import com.internship.epayment.entity.UserRole;
import com.internship.epayment.repository.ImageRepository;
import com.internship.epayment.service.ImageService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private ImageRepository imageRepository;


    @Override
    public List<Image> getAll() {
        List<Image> list = new ArrayList<>();
        imageRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Image findById(Long id) throws NotFoundException {
        Image image = imageRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
        return image;
    }

    @Override
    public Image addImage(Image image) {
        Image i = imageRepository.save(image);
        return i;
    }

    @Override
    public Image updateImage(Image image) {
        Image i = imageRepository.save(image);
        return i;
    }

    @Override
    public void deleteImage(Image image) {
        imageRepository.delete(image);
    }
}
