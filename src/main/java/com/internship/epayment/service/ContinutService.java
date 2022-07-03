package com.internship.epayment.service;

import com.internship.epayment.entity.Clasa_Test;
import com.internship.epayment.entity.Continut;
import javassist.NotFoundException;

import java.util.List;

public interface ContinutService {

    List<Continut> getAll();

    Continut findById(Long id) throws NotFoundException;

    Continut addContinut(Continut continut);

    Continut updateContinut(Continut continut);

    void deleteContinut(Continut continut);
}
