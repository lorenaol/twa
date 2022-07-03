package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Anunt;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.service.AnuntService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AnuntServiceImpl implements AnuntService {

    @Autowired
    private AnuntRepository anuntRepository;

    @Override
    public List<Anunt> getAll() {
        return anuntRepository.findAll();
    }

    @Override
    public Anunt findById(Long id) throws NotFoundException {
        return anuntRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    @Transactional
    public Anunt addAnunt(Anunt product) {
        int i;
        Anunt p = anuntRepository.save(product);
        return p;
    }

    @Override
    @Transactional
    public Anunt updateAnunt(Anunt product) {
        int i;
        Anunt p = anuntRepository.save(product);
        return p;
    }

    @Override
    @Transactional
    public void deleteAnunt(Anunt product) {
        anuntRepository.delete(product);
    }


}
