package com.internship.epayment.rest;


import com.internship.epayment.data.ProductExcelExporter;
import com.internship.epayment.data.ProductPDFExporter;
import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Product;
import com.internship.epayment.service.AnuntService;
import com.internship.epayment.service.ProductsService;
import com.internship.epayment.util.PaginationUtil;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/api/anunturi")
public class AnuntController {

    @Autowired
    private AnuntService anuntService;

    @GetMapping
    public List<Anunt> getProducts() {
        return anuntService.getAll();
    }

    @GetMapping(path = "/{email}")
    public List<Anunt> getProductById(@PathVariable String email) throws NotFoundException {
        return anuntService.findById(email);
    }

    @PostMapping
    public Anunt addProduct(@RequestBody Anunt product) {
        Anunt p = null;
        if (product != null) {
            p = anuntService.addAnunt(product);
        }
        return p;
    }

    @PutMapping
    @ResponseBody
    public Anunt updateProduct(@RequestBody Anunt product) {
        return anuntService.updateAnunt(product);
    }

    @DeleteMapping
    public void deleteProduct(@RequestBody Anunt product) {
        anuntService.deleteAnunt(product);
    }


}
