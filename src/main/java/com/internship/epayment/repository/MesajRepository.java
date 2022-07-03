package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Mesaj;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MesajRepository  extends JpaRepository<Mesaj, Long> {
}
