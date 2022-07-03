package com.internship.epayment.service;

import com.internship.epayment.entity.Document;
import javassist.NotFoundException;

import java.util.List;

public interface DocumentService {
    List<Document> getAll();

    Document findById(Long id) throws NotFoundException;

    Document addDocument(Document document);

    Document updateDocument(Document document);

    void deleteDocument(Document document);
}
