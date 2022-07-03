package com.internship.epayment.entity;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "mesaj")
public class Mesaj {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mesaj_seq")
    @SequenceGenerator(name = "mesaj_seq", allocationSize = 1)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "conversatie_id", referencedColumnName = "id", nullable = false)
    private Conversatie conversatie;

    String text;

    LocalDateTime date;

    Boolean seen;

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

    public Conversatie getConversatie() {
        return conversatie;
    }

    public void setConversatie(Conversatie conversatie) {
        this.conversatie = conversatie;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Boolean getSeen() {
        return seen;
    }

    public void setSeen(Boolean seen) {
        this.seen = seen;
    }
}
