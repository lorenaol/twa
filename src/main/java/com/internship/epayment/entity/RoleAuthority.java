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

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roleauthorities_seq")
    @SequenceGenerator(name = "roleauthorities_seq", allocationSize = 1)

    private Long id;
    @Column(name = "startDate", length = 100)
    private Date startDate;
    @Column(name = "endDate", length = 100)
    private Date endDate;
    @ManyToOne
    @JoinColumn(name="roleId", referencedColumnName = "id", nullable = false)
    private Role role;
    @ManyToOne
    @JoinColumn(name="authorityId", referencedColumnName = "id", nullable = false)
    private Authority authority;

}
