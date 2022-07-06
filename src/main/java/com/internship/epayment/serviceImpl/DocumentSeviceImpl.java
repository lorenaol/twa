package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Document;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.DocumentRepository;
import com.internship.epayment.service.DocumentService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentSeviceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;


    @Override
    public List<Document> getAll() {
        return documentRepository.findAll();
    }

    @Override
    public List<Document> findById(Long id) {
        return documentRepository.findDocumenteById(id);
    }

    @Override
    public Document addDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public Document updateDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public void deleteDocument(Document document) {
        documentRepository.delete(document);
    }
}
