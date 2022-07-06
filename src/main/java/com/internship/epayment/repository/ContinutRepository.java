package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Continut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContinutRepository  extends JpaRepository<Continut, Long> {
    @Query("select c from Continut c where c.test.id =:id")
    List<Continut> findContinutByTestId(Long id);
}
