package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Clasa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnuntRepository extends JpaRepository<Anunt, Long> {
    @Query("select a from Anunt a where a.user.email =:email")
    List<Anunt> findAnunturiByUserId(String email);
}
