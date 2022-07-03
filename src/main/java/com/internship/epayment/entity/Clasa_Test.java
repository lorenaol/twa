package com.internship.epayment.entity;

import javax.persistence.*;

@Entity
@Table(name = "clasa_test")
public class Clasa_Test {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "clasa_test_seq")
    @SequenceGenerator(name = "clasa_test_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clasa_id", referencedColumnName = "id", nullable = false)
    private Test test;

    @ManyToOne
    @JoinColumn(name = "test_id", referencedColumnName = "id", nullable = false)
    private Clasa clasa;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public Clasa getClasa() {
        return clasa;
    }

    public void setClasa(Clasa clasa) {
        this.clasa = clasa;
    }
}
