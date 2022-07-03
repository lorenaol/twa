package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Document_Clasa;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.DocumentClasaRepository;
import com.internship.epayment.service.DocumentClasaService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentClasaServiceImpl implements DocumentClasaService {

    @Autowired
    private DocumentClasaRepository documentClasaRepository;

    @Override
    public List<Document_Clasa> getAll() {
        return documentClasaRepository.findAll();
    }

    @Override
    public Document_Clasa findById(Long id) throws NotFoundException {
        return documentClasaRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public Document_Clasa addDocumentClasa(Document_Clasa documentClasa) {
        return documentClasaRepository.save(documentClasa);
    }

    @Override
    public Document_Clasa updateDocumentClasa(Document_Clasa documentClasa) {
        return documentClasaRepository.save(documentClasa);
    }

    @Override
    public void deleteDocumentClasa(Document_Clasa documentClasa) {
        documentClasaRepository.delete(documentClasa);
    }
}
