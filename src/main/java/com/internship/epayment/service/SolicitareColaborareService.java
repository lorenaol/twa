package com.internship.epayment.service;

import com.internship.epayment.entity.Mesaj;
import com.internship.epayment.entity.Solicitare_Colaborare;
import javassist.NotFoundException;

import java.util.List;

public interface SolicitareColaborareService {
    List<Solicitare_Colaborare> getAll();

    List<Solicitare_Colaborare> findById(String email);

    Solicitare_Colaborare addSolicitareColaborare(Solicitare_Colaborare solicitareColaborare);

    Solicitare_Colaborare updateSolicitareColaborare(Solicitare_Colaborare solicitareColaborare);

    void deleteSolicitareColaborare(Solicitare_Colaborare solicitareColaborare);
}
