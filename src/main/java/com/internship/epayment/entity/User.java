package com.internship.epayment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.util.*;

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
    private String password;

    private boolean is_active;

    private Date start_date;

    private Date end_date;

    @ManyToMany
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    Set<Role> userRoles;

    @JsonIgnore
    public Set<Role> getUserRoles() {
        return userRoles;
    }

//    @org.springframework.data.annotation.Transient
//    public Set<String> getAuthorities() {
//        Set<String> authorities = new HashSet<>();
//        if (userRoles == null) {
//            return null;
//        }
//        for (Role r : userRoles) {
//            for (Authority a : r.getRoleAuthorities()) {
//                authorities.add(a.getCode());
//            }
//        }
//        return authorities;
//    }

//    @JsonIgnore
//    public void setAuthorities(Set<String>authorities){
//
//    }

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

}
