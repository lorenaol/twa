package com.internship.epayment.data;

import com.internship.epayment.entity.Product;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class ProductPDFExporter {
    private List<Product> productList;

    public ProductPDFExporter(List<Product> productList) {
        this.productList = productList;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.GRAY);
        cell.setPadding(4);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        List<String> strings = Arrays.asList(new String[]{"ID", "Name", "Sku", "Code"});

        for (String s : strings) {
            cell.setPhrase(new Phrase(String.valueOf(s), font));
            table.addCell(cell);
        }
//        cell.setPhrase(new Phrase("ID", font));
//        table.addCell(cell);
//
//        cell.setPhrase(new Phrase("Name", font));
//        table.addCell(cell);
//
//        cell.setPhrase(new Phrase("Sku", font));
//        table.addCell(cell);
//
//        cell.setPhrase(new Phrase("Code", font));
//        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        for (Product product : productList) {
            table.addCell(String.valueOf(product.getId()));
            table.addCell(product.getName());
            table.addCell(product.getSku());
            table.addCell(product.getCode());
        }
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);

        Paragraph p = new Paragraph("List of Products", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(p);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100f);
        table.setWidths(new float[]{1.5f, 3.5f, 3.0f, 3.0f});
        table.setSpacingBefore(10);

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);

        document.close();

    }
}
