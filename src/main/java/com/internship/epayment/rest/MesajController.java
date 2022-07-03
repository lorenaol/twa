package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Mesaj;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.MesajService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/mesaje")
public class MesajController {
    @Autowired
    private MesajService mesajService;

    @GetMapping
    public List<Mesaj> getClase() {
        return mesajService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Mesaj getClasaById(@PathVariable Long id) throws NotFoundException {
        return mesajService.findById(id);
    }

    @PostMapping
    public Mesaj addClasa(@RequestBody Mesaj clasa) {
        Mesaj c = null;
        if (clasa != null) {
            c = mesajService.addMesaj(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Mesaj updateClasa(@RequestBody Mesaj clasa) {
        return mesajService.updateMesaj(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Mesaj clasa) {
        mesajService.deleteMesaj(clasa);
    }
}
