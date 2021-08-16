package com.internship.epayment.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq")
    @SequenceGenerator(name = "users_seq", allocationSize = 1)
    private Long id;

    private String name;

    private String email;

    @Column(name = "pass", length = 100)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    //specifica modul în care proprietatea poate fi accesată în timpul serializării („citire”) și deserializare („scriere”)
    private String password;

    private boolean is_active;

    private Date start_date;

    private Date end_date;

    private double latitude;

    private double longitude;

    private String address;

    private String token;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime token_creation_date;

    public LocalDateTime getTokenCreationDate() {
        return token_creation_date;
    }

    public void setTokenCreationDate(LocalDateTime token_creation_date) {
        this.token_creation_date = token_creation_date;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
