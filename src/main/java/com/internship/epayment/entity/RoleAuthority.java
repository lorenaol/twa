package com.internship.epayment.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "roleauthorities")
public class RoleAuthority {
    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }



    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roleauthorities_seq")
    @SequenceGenerator(name = "roleauthorities_seq", allocationSize = 1)

    private Long id;

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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Authority getAuthority() {
        return authority;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    private Date start_date;
    private Date end_date;
    @ManyToOne
    @JoinColumn(name="role_id", referencedColumnName = "id", nullable = false)
    private Role role;
    @ManyToOne
    @JoinColumn(name="authority_id", referencedColumnName = "id", nullable = false)
    private Authority authority;

}
