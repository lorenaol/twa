package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Document;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.DocumentService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/documente")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    @GetMapping
    public List<Document> getClase() {
        return documentService.getAll();
    }

    @GetMapping(path = "/{id}")
    public List<Document> getDocumentByClasaId(@PathVariable Long id) throws NotFoundException {
        return documentService.findById(id);
    }

    @PostMapping
    public Document addClasa(@RequestBody Document clasa) {
        Document c = null;
        if (clasa != null) {
            c = documentService.addDocument(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Document updateClasa(@RequestBody Document clasa) {
        return documentService.updateDocument(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Document clasa) {
        documentService.deleteDocument(clasa);
    }
}
