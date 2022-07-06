package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Document;
import com.internship.epayment.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TestRepository  extends JpaRepository<Test, Long> {
    @Query("select t from Test t where t.clasa.id =:id")
    List<Test> findTesteById(Long id);
}
