package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Clasa;
import com.internship.epayment.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DocumentRepository  extends JpaRepository<Document, Long> {
    @Query("select d from Document d where d.clasa.id =:id")
    List<Document> findDocumenteById(Long id);
}
