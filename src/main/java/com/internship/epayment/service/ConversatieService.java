package com.internship.epayment.service;

import com.internship.epayment.entity.Continut;
import com.internship.epayment.entity.Conversatie;
import javassist.NotFoundException;

import java.util.List;

public interface ConversatieService {
    List<Conversatie> getAll();

    Conversatie findById(Long id) throws NotFoundException;

    Conversatie addConversatie(Conversatie conversatie);

    Conversatie updateConversatie(Conversatie conversatie);

    void deleteConversatie(Conversatie conversatie);
}
