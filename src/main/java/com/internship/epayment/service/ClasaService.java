package com.internship.epayment.service;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Clasa;
import javassist.NotFoundException;

import java.util.List;

public interface ClasaService {

    List<Clasa> getAll();

    List<Clasa> findById(String userName);

    Clasa addClasa(Clasa clasa);

    Clasa updateClasa(Clasa clasa);

    void deleteClasa(Clasa clasa);
}
