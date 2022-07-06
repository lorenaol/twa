package com.internship.epayment.rest;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Test;
import com.internship.epayment.service.ClasaService;
import com.internship.epayment.service.TestService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/teste")
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping
    public List<Test> getClase() {
        return testService.getAll();
    }

    @GetMapping(path = "/{id}")
    public List<Test> getClasaById(@PathVariable Long id) throws NotFoundException {
        return testService.findById(id);
    }

    @PostMapping
    public Test addClasa(@RequestBody Test clasa) {
        Test c = null;
        if (clasa != null) {
            c = testService.addTest(clasa);
        }
        return c;
    }

    @PutMapping
    @ResponseBody
    public Test updateClasa(@RequestBody Test clasa) {
        return testService.updateTest(clasa);
    }

    @DeleteMapping
    public void deleteClasa(@RequestBody Test clasa) {
        testService.deleteTest(clasa);
    }
}
