package com.internship.epayment.service;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Clasa_Test;
import javassist.NotFoundException;

import java.util.List;

public interface ClasaTestService {

    List<Clasa_Test> getAll();

    Clasa_Test findById(Long id) throws NotFoundException;

    Clasa_Test addClasaTest(Clasa_Test clasa_test);

    Clasa_Test updateClasaTest(Clasa_Test clasa_test);

    void deleteClasaTest(Clasa_Test clasa_test);
}
