package com.internship.epayment.service;

import com.internship.epayment.entity.Solicitare_Colaborare;
import com.internship.epayment.entity.Test;
import javassist.NotFoundException;

import java.util.List;

public interface TestService {
    List<Test> getAll();

    Test findById(Long id) throws NotFoundException;

    Test addTest(Test test);

    Test updateTest(Test test);

    void deleteTest(Test test);
}
