package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Continut;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.ContinutService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/continut")
public class ContinutController {
    @Autowired
    private ContinutService continutService;

    @GetMapping
    public List<Continut> getClase() {
        return continutService.getAll();
    }

    @GetMapping(path = "/{id}")
    public List<Continut> getClasaById(@PathVariable Long id) throws NotFoundException {
        return continutService.findById(id);
    }

    @PostMapping
    public Continut addClasa(@RequestBody Continut clasa) {
        Continut c = null;
        if (clasa != null) {
            c = continutService.addContinut(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Continut updateClasa(@RequestBody Continut clasa) {
        return continutService.updateContinut(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Continut clasa) {
        continutService.deleteContinut(clasa);
    }
}
