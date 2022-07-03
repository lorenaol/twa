package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Clasa_Test;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.ClasaTestService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/clasaTest")
public class ClasaTestController {
    @Autowired
    private ClasaTestService clasaTestService;

    @GetMapping
    public List<Clasa_Test> getClase() {
        return clasaTestService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Clasa_Test getClasaById(@PathVariable Long id) throws NotFoundException {
        return clasaTestService.findById(id);
    }

    @PostMapping
    public Clasa_Test addClasa(@RequestBody Clasa_Test clasa) {
        Clasa_Test c = null;
        if (clasa != null) {
            c = clasaTestService.addClasaTest(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Clasa_Test updateClasa(@RequestBody Clasa_Test clasa) {
        return clasaTestService.updateClasaTest(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Clasa_Test clasa) {
        clasaTestService.deleteClasaTest(clasa);
    }
}
