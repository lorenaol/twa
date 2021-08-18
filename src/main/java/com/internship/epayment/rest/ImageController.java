package com.internship.epayment.rest;

import com.internship.epayment.entity.Image;
import com.internship.epayment.entity.UserRole;
import com.internship.epayment.service.ImageService;

import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<Image> getImages() {
        return imageService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Image getImageById(@PathVariable Long id) throws NotFoundException {
        return imageService.findById(id);
    }

    @PostMapping
    public Image addUserRole(@RequestBody Image image) {
        Image i = null;
        if (image != null) {
            i = imageService.addImage(image);
        }
        return i;
    }

    @PutMapping
    @ResponseBody
    public Image updateImage(@RequestBody Image image) {
        return imageService.updateImage(image);
    }

    @DeleteMapping
    public void deleteImage(@RequestBody Image image) {
        imageService.deleteImage(image);
    }
}
