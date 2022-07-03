package com.internship.epayment.repository;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository  extends JpaRepository<Document, Long> {
}
