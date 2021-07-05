package com.internship.epayment.entity;
import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "roleauthorities")
public class RoleAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roleauthorities_seq")
    @SequenceGenerator(name = "roleauthorities_seq", allocationSize = 1)

    private Long id;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @ManyToOne
    @JoinColumn(name="role_id", referencedColumnName = "id", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name="authority_id", referencedColumnName = "id", nullable = false)
    private Authority authority;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Authority getAuthority() {
        return authority;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

}
