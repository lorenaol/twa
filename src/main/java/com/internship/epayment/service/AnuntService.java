package com.internship.epayment.service;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Product;
import javassist.NotFoundException;

import java.util.List;

public interface AnuntService {
    List<Anunt> getAll();

    Anunt findById(Long id) throws NotFoundException;

    Anunt addAnunt(Anunt anunt);

    Anunt updateAnunt(Anunt anunt);

    void deleteAnunt(Anunt anunt);
}
