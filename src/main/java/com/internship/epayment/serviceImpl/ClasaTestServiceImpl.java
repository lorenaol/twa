package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Clasa_Test;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.ClasaTestRepository;
import com.internship.epayment.service.ClasaTestService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClasaTestServiceImpl implements ClasaTestService {

    @Autowired
    private ClasaTestRepository clasaTestRepository;

    @Override
    public List<Clasa_Test> getAll() {
        return clasaTestRepository.findAll();
    }

    @Override
    public Clasa_Test findById(Long id) throws NotFoundException {
        return clasaTestRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public Clasa_Test addClasaTest(Clasa_Test clasa_test) {
        return clasaTestRepository.save(clasa_test);
    }

    @Override
    public Clasa_Test updateClasaTest(Clasa_Test clasa_test) {
        return clasaTestRepository.save(clasa_test);
    }

    @Override
    public void deleteClasaTest(Clasa_Test clasa_test) {
        clasaTestRepository.delete(clasa_test);
    }
}
