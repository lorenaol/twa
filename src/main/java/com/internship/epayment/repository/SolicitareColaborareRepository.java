package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Review;
import com.internship.epayment.entity.Solicitare_Colaborare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SolicitareColaborareRepository  extends JpaRepository<Solicitare_Colaborare, Long> {
    @Query("select s from Solicitare_Colaborare s where s.anunt.user.email =:email")
    List<Solicitare_Colaborare> findSolicitariByAnuntUserId(String email);
}
