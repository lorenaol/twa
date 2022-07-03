package com.internship.epayment.entity;

import liquibase.pro.packaged.D;

import javax.persistence.*;

@Entity
@Table(name = "documnet_clasa")
public class Document_Clasa {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "documnet_clasa_seq")
    @SequenceGenerator(name = "documnet_clasa_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clasa_id", referencedColumnName = "id", nullable = false)
    private Clasa clasa;

    @ManyToOne
    @JoinColumn(name = "document_id", referencedColumnName = "id", nullable = false)
    private Document document;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Clasa getClasa() {
        return clasa;
    }

    public void setClasa(Clasa clasa) {
        this.clasa = clasa;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }
}
