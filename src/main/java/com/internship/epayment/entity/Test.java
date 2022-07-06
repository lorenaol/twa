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

    private LocalDateTime date1;

    @Column(name = "nume_test")
    private String numeTest;

    @Column(name = "notare_totala")
    private Double notareTotala;

    @ManyToOne
    @JoinColumn(name = "clasa_id", referencedColumnName = "id", nullable = false)
    private Clasa clasa;

    private String stare;

    public String getStare() {
        return stare;
    }

    public void setStare(String stare) {
        this.stare = stare;
    }

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

    public LocalDateTime getDate1() {
        return date1;
    }

    public void setDate1(LocalDateTime date1) {
        this.date1 = date1;
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
