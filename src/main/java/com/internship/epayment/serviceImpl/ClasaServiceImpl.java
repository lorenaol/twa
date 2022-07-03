package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Clasa;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.ClasaRepository;
import com.internship.epayment.service.ClasaService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClasaServiceImpl implements ClasaService {

    @Autowired
    private ClasaRepository clasaRepository;

    @Override
    public List<Clasa> getAll() {
        return clasaRepository.findAll();
    }

    @Override
    public Clasa findById(Long id) throws NotFoundException {
        return clasaRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public Clasa addClasa(Clasa clasa) {
        return clasaRepository.save(clasa);
    }

    @Override
    public Clasa updateClasa(Clasa clasa) {
        return clasaRepository.save(clasa);
    }

    @Override
    public void deleteClasa(Clasa clasa) {
        clasaRepository.delete(clasa);
    }
}
