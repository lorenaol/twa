package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Continut;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.ContinutRepository;
import com.internship.epayment.service.ContinutService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContinutServiceImpl implements ContinutService {

    @Autowired
    private ContinutRepository continutRepository;

    @Override
    public List<Continut> getAll() {
        return continutRepository.findAll();
    }

    @Override
    public List<Continut> findById(Long id) {
        return continutRepository.findContinutByTestId(id);
    }

    @Override
    public Continut addContinut(Continut continut) {
        return continutRepository.save(continut);
    }

    @Override
    public Continut updateContinut(Continut continut) {
        return continutRepository.save(continut);
    }

    @Override
    public void deleteContinut(Continut continut) {
        continutRepository.delete(continut);
    }
}
