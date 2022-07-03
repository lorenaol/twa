package com.internship.epayment.service;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Clasa;
import javassist.NotFoundException;

import java.util.List;

public interface ClasaService {

    List<Clasa> getAll();

    Clasa findById(Long id) throws NotFoundException;

    Clasa addClasa(Clasa clasa);

    Clasa updateClasa(Clasa clasa);

    void deleteClasa(Clasa clasa);
}
