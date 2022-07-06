package com.internship.epayment.service;

import com.internship.epayment.entity.Clasa_Test;
import com.internship.epayment.entity.Continut;
import javassist.NotFoundException;

import java.util.List;

public interface ContinutService {

    List<Continut> getAll();

    List<Continut> findById(Long id);

    Continut addContinut(Continut continut);

    Continut updateContinut(Continut continut);

    void deleteContinut(Continut continut);
}
