package com.internship.epayment.repository;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Solicitare_Colaborare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClasaRepository  extends JpaRepository<Clasa, Long> {
    @Query("select c from Clasa c where c.profesor.email =:email or c.student.email=:email")
    List<Clasa> findClaseByUserId(String email);
}
