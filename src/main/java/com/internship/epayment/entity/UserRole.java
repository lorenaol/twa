package com.internship.epayment.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_roles")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_roles_seq")
    @SequenceGenerator(name = "user_roles_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
    private Role role;

//    @ManyToOne
//    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
//    private User user;
//

    @Column(name = "start_date", length = 100)
    private Date start_date;

    @Column(name = "end_date", length = 100)
    private Date end_date;

}
