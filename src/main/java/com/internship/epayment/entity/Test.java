package com.internship.epayment.entity;

import liquibase.pro.packaged.C;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "test")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "test_seq")
    @SequenceGenerator(name = "test_seq", allocationSize = 1)
    private Long id;

    private LocalDateTime date;

    @Column(name = "nume_test")
    private String numeTest;

    @Column(name = "notare_totala")
    private Double notareTotala;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getNumeTest() {
        return numeTest;
    }

    public void setNumeTest(String numeTest) {
        this.numeTest = numeTest;
    }

    public Double getNotareTotala() {
        return notareTotala;
    }

    public void setNotareTotala(Double notareTotala) {
        this.notareTotala = notareTotala;
    }
}
