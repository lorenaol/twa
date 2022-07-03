package com.internship.epayment.service;

import com.internship.epayment.entity.Document;
import com.internship.epayment.entity.Mesaj;
import javassist.NotFoundException;

import java.util.List;

public interface MesajService {
    List<Mesaj> getAll();

    Mesaj findById(Long id) throws NotFoundException;

    Mesaj addMesaj(Mesaj mesaj);

    Mesaj updateMesaj(Mesaj mesaj);

    void deleteMesaj(Mesaj mesaj);
}
