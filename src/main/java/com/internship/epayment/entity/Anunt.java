package com.internship.epayment.entity;


import liquibase.pro.packaged.S;

import javax.persistence.*;

@Entity
@Table(name = "anunturi")
public class Anunt {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "anunturi_seq")
    @SequenceGenerator(name = "anunturi_seq", allocationSize = 1)
    private Long id;

    private String oras;

    private String telefon;

    private String materie;

//    private String tip;

    private String detalii;

    private String image;

    private String facultate;

    private String clasa;

    private String an;

    @ManyToOne
    @JoinColumn(name = "user_anunt_id", referencedColumnName = "id", nullable = false)
    private User user;

//    @OneToMany(mappedBy = "product")
//    @JsonIgnoreProperties("product")
//    private List<Image> images;

//    @Column(name = "created_date")
//    private Date createdDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOras() {
        return oras;
    }

    public void setOras(String oras) {
        this.oras = oras;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getMaterie() {
        return materie;
    }

    public void setMaterie(String materie) {
        this.materie = materie;
    }
//
//    public String getTip() {
//        return tip;
//    }
//
//    public void setTip(String tip) {
//        this.tip = tip;
//    }

    public String getDetalii() {
        return detalii;
    }

    public void setDetalii(String detalii) {
        this.detalii = detalii;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setFacultate(String facultate) {
        this.facultate = facultate;
    }

    public void setClasa(String clasa) {
        this.clasa = clasa;
    }

    public void setAn(String an) {
        this.an = an;
    }
}
