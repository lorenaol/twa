package com.internship.epayment.entity;

import liquibase.pro.packaged.C;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "document")
public class Document {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "document_seq")
    @SequenceGenerator(name = "document_seq", allocationSize = 1)
    private Long id;

    @Column(name = "data_incarcare")
    LocalDateTime dataIncarcare;

    String denumire;

    @ManyToOne
    @JoinColumn(name = "clasa_id", referencedColumnName = "id", nullable = false)
    private Clasa clasa;

    public Clasa getClasa() {
        return clasa;
    }

    public void setClasa(Clasa clasa) {
        this.clasa = clasa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataIncarcare() {
        return dataIncarcare;
    }

    public void setDataIncarcare(LocalDateTime dataIncarcare) {
        this.dataIncarcare = dataIncarcare;
    }

    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }
}
