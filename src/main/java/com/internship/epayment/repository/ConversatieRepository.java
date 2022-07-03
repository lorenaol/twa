package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Conversatie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversatieRepository  extends JpaRepository<Conversatie, Long> {
}
