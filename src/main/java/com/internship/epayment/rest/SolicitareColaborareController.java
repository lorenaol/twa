package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Solicitare_Colaborare;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.SolicitareColaborareService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/solicitari_colaborare")
public class SolicitareColaborareController {
    @Autowired
    private SolicitareColaborareService solicitareColaborareService;


    @GetMapping
    public List<Solicitare_Colaborare> getClase() {
        return solicitareColaborareService.getAll();
    }

    @GetMapping(path = "/{userName}")
    public List<Solicitare_Colaborare> getClasaById(@PathVariable String userName) throws NotFoundException {
        return solicitareColaborareService.findById(userName);
    }

    @PostMapping
    public Solicitare_Colaborare addClasa(@RequestBody Solicitare_Colaborare clasa) {
        Solicitare_Colaborare c = null;
        if (clasa != null) {
            c = solicitareColaborareService.addSolicitareColaborare(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Solicitare_Colaborare updateClasa(@RequestBody Solicitare_Colaborare clasa) {
        return solicitareColaborareService.updateSolicitareColaborare(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Solicitare_Colaborare clasa) {
        solicitareColaborareService.deleteSolicitareColaborare(clasa);
    }
}
