package com.internship.epayment.entity;


import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitare_colaborare")
public class Solicitare_Colaborare {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "solicitare_colaborare_seq")
    @SequenceGenerator(name = "solicitare_colaborare_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "anunt_id", referencedColumnName = "id", nullable = false)
    private Anunt anunt;

    @Column(name = "data_solicitare")
    private LocalDateTime dataSolicitare;

    private boolean accepted;

    @Column(name = "data_raspuns")
    private LocalDateTime dataRaspuns;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Anunt getAnunt() {
        return anunt;
    }

    public void setAnunt(Anunt anunt) {
        this.anunt = anunt;
    }

    public LocalDateTime getDataSolicitare() {
        return dataSolicitare;
    }

    public void setDataSolicitare(LocalDateTime dataSolicitare) {
        this.dataSolicitare = dataSolicitare;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public LocalDateTime getDataRaspuns() {
        return dataRaspuns;
    }

    public void setDataRaspuns(LocalDateTime dataRaspuns) {
        this.dataRaspuns = dataRaspuns;
    }
}
