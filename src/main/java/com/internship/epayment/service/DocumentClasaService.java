package com.internship.epayment.service;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Document_Clasa;
import javassist.NotFoundException;

import java.util.List;

public interface DocumentClasaService {

    List<Document_Clasa> getAll();

    Document_Clasa findById(Long id) throws NotFoundException;

    Document_Clasa addDocumentClasa(Document_Clasa documentClasa);

    Document_Clasa updateDocumentClasa(Document_Clasa documentClasa);

    void deleteDocumentClasa(Document_Clasa documentClasa);
}
