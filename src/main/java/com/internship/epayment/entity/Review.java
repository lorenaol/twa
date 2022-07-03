package com.internship.epayment.entity;



import javax.persistence.*;


@Entity
@Table(name="reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reviews_seq")
    @SequenceGenerator(name = "reviews_seq", allocationSize = 1)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @ManyToOne
    @JoinColumn(name = "anunt_id", referencedColumnName = "id", nullable = false)
    private Anunt anunt;

    public Anunt getAnunt() {
        return anunt;
    }

    public void setAnunt(Anunt anunt) {
        this.anunt = anunt;
    }

    private String text;

    private String text2;

    private int stars;

    public String getText2() {
        return text2;
    }

    public void setText2(String text2) {
        this.text2 = text2;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }



    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }
}


