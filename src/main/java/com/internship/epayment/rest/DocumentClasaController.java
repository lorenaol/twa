package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Document_Clasa;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.DocumentClasaService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/documentClasa")
public class DocumentClasaController {
    @Autowired
    private DocumentClasaService documentClasaService;

    @GetMapping
    public List<Document_Clasa> getClase() {
        return documentClasaService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Document_Clasa getClasaById(@PathVariable Long id) throws NotFoundException {
        return documentClasaService.findById(id);
    }

    @PostMapping
    public Document_Clasa addClasa(@RequestBody Document_Clasa clasa) {
        Document_Clasa c = null;
        if (clasa != null) {
            c = documentClasaService.addDocumentClasa(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Document_Clasa updateClasa(@RequestBody Document_Clasa clasa) {
        return documentClasaService.updateDocumentClasa(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Document_Clasa clasa) {
        documentClasaService.deleteDocumentClasa(clasa);
    }
}
