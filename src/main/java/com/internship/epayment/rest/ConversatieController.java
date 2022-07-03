package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Conversatie;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.ConversatieService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/conversatii")
public class ConversatieController {
    @Autowired
    private ConversatieService conversatieService;

    @GetMapping
    public List<Conversatie> getClase() {
        return conversatieService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Conversatie getClasaById(@PathVariable Long id) throws NotFoundException {
        return conversatieService.findById(id);
    }

    @PostMapping
    public Conversatie addClasa(@RequestBody Conversatie clasa) {
        Conversatie c = null;
        if (clasa != null) {
            c = conversatieService.addConversatie(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Conversatie updateClasa(@RequestBody Conversatie clasa) {
        return conversatieService.updateConversatie(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Conversatie clasa) {
        conversatieService.deleteConversatie(clasa);
    }
}
