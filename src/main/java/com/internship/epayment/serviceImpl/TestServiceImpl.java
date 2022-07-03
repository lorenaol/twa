package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Test;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.TestRepository;
import com.internship.epayment.service.TestService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Override
    public List<Test> getAll() {
        return testRepository.findAll();
    }

    @Override
    public Test findById(Long id) throws NotFoundException {
        return testRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public Test addTest(Test test) {
        return testRepository.save(test);
    }

    @Override
    public Test updateTest(Test test) {
        return testRepository.save(test);
    }

    @Override
    public void deleteTest(Test test) {
        testRepository.delete(test);
    }
}
