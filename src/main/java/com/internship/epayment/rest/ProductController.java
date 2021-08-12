package com.internship.epayment.rest;


import com.internship.epayment.data.ProductExcelExporter;
import com.internship.epayment.data.ProductPDFExporter;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.User;
import com.internship.epayment.service.ProductsService;
import com.internship.epayment.util.PaginationUtil;
import com.lowagie.text.DocumentException;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    @Autowired
    private ProductsService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(Pageable pageable) {
        Page<Product> page = productService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<Product>> filterProducts(@RequestHeader(name = "FILTER-PARAMS") List<String> params,
                                                        Pageable pageable) {
        Page<Product> page = productService.filter(params, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(path = "/{id}")
    public Product getProductById(@PathVariable Long id) throws NotFoundException {
        return productService.findById(id);
    }

    @GetMapping(path = "/sort{param}")
    public List<Product> sortProducts(@PathVariable String param, @RequestParam(value = "direction") String direction) {
        return productService.order(param, direction);
    }

    @GetMapping(path = "/findByCode")
    public Product getProductsByCode(@RequestParam(value = "code") String code) throws NotFoundException {
        return productService.findByCode(code);
    }

    @GetMapping(path = "/findBySku")
    public Product getProductsBySku(@RequestParam(value = "sku") String sku) throws NotFoundException {
        return productService.findBySku(sku);
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        Product p = null;
        if (product != null) {
            p = productService.addProduct(product);
        }
        return p;
    }

    @PutMapping
    @ResponseBody
    public Product updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

    @DeleteMapping
    public void deleteProduct(@RequestBody Product product) {
        productService.deleteProduct(product);
    }

//    @GetMapping("/export/excel")
//    public void exportToExcel(HttpServletResponse response, @RequestHeader(name = "FILTER-PARAMS") List<String> params,
//                              Pageable pageable) throws IOException {
//
//        response.setContentType("application/octet-stream");
//        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH_mm_ss");
//        String currentDateTime = dateFormatter.format(new Date());
//
//        String headerValue = "attachment; filename=products_" + currentDateTime + ".xlsx";
//        response.setHeader(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION);
//        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, headerValue);
//
//        List<Product> productList = productService.filter(params, pageable).toList();
//
//        ProductExcelExporter excelExporter = new ProductExcelExporter(productList);
//
//        excelExporter.export(response);
//    }
//
//    @GetMapping("/export/pdf")
//    public void exportToPDF(HttpServletResponse response, @RequestHeader(name = "FILTER-PARAMS") List<String> params,
//                            Pageable pageable) throws DocumentException, IOException {
//        response.setContentType("application/pdf");
//        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//        //  String currentDateTime = "2021-08-04_10_54_33";
//        String currentDateTime = dateFormatter.format(new Date()).replace(":", "_");
//
//        String headerValue = "attachment; filename=products_" + currentDateTime + ".pdf";
//        response.setHeader(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION);
//        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, headerValue);
//
//        List<Product> productList = productService.filter(params, pageable).toList();
//
//        ProductPDFExporter exporter = new ProductPDFExporter(productList);
//        exporter.export(response);
//
//    }

    @GetMapping("/export/{type}")
    public void export(HttpServletResponse response, @PathVariable String type, @RequestHeader(name = "FILTER-PARAMS") List<String> params,
                       Pageable pageable) throws Exception {

        if (!type.equals("excel") && !type.equals("pdf"))
            throw new Exception("only pdf or excel type");

        if (type.equals("excel")) {
            response.setContentType("application/octet-stream");
        } else {
            response.setContentType("application/pdf");
        }

        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH_mm_ss");
        String currentDateTime = dateFormatter.format(new Date());

        String extension = type.equals("excel") ? ".xlsx" : ".pdf";

        String headerValue = "attachment; filename=products_" + currentDateTime + extension;
        response.setHeader(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION);
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, headerValue);

        List<Product> productList = productService.filter(params, pageable).toList();

        if (type.equals("excel")) {
            ProductExcelExporter excelExporter = new ProductExcelExporter(productList);
            excelExporter.export(response);
        } else {
            ProductPDFExporter exporter = new ProductPDFExporter(productList);
            exporter.export(response);
        }
    }

}
