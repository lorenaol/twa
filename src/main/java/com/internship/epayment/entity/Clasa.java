package com.internship.epayment.entity;

import javax.persistence.*;

@Entity
@Table(name = "clasa")
public class Clasa {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "clasa_seq")
    @SequenceGenerator(name = "clasa_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prefosor_email", referencedColumnName = "id", nullable = false)
    private User profesor;

    @ManyToOne
    @JoinColumn(name = "student_email", referencedColumnName = "id", nullable = false)
    private User student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getProfesor() {
        return profesor;
    }

    public void setProfesor(User profesor) {
        this.profesor = profesor;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }
}
