package com.internship.epayment.entity;

import javax.persistence.*;

@Entity
@Table(name = "continut")
public class Continut {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "anunturi_seq")
    @SequenceGenerator(name = "anunturi_seq", allocationSize = 1)
    private Long id;

    String intrebare;

    String raspuns;

    @ManyToOne
    @JoinColumn(name = "test_id", referencedColumnName = "id", nullable = false)
    private Test test;

    @Column(name = "notare_individuala")
    Double notareIndividuala;

    @Column(name = "notare_maxima")
    Double notareMaxima;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntrebare() {
        return intrebare;
    }

    public void setIntrebare(String intrebare) {
        this.intrebare = intrebare;
    }

    public String getRaspuns() {
        return raspuns;
    }

    public void setRaspuns(String raspuns) {
        this.raspuns = raspuns;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public Double getNotareIndividuala() {
        return notareIndividuala;
    }

    public void setNotareIndividuala(Double notareIndividuala) {
        this.notareIndividuala = notareIndividuala;
    }

    public Double getNotareMaxima() {
        return notareMaxima;
    }

    public void setNotareMaxima(Double notareMaxima) {
        this.notareMaxima = notareMaxima;
    }
}
