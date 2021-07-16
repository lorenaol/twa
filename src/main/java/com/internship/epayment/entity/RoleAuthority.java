package com.internship.epayment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rolesauthorities")
public class RoleAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rolesauthorities_seq")
    @SequenceGenerator(name = "rolesauthorities_seq", allocationSize = 1)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
    private Role role;

    @JsonIgnore
    public Role getRole() {
        return role;
    }
    @JsonIgnore
    public void setRole(Role role) {
        this.role = role;
    }

    public Long getRole_id(){
        return role.getId();
    }

    @ManyToOne
    @JoinColumn(name = "authority_id", referencedColumnName = "id", nullable = false)
    private Authority authority;

    @JsonIgnore
    public Authority getAuthority() {
        return authority;
    }
    @JsonIgnore
    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    public Long getAuthority_id(){
        return authority.getId();
    }


    @Column(name = "start_date", length = 100)
    private Date start_date;

    public Date getStart_date() {
        return start_date;
    }
    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }


    @Column(name = "end_date", length = 100)
    private Date end_date;

    public Date getEnd_date() {
        return end_date;
    }
    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }
}
