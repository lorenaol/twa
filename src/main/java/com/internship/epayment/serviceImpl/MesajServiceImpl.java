package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Mesaj;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.MesajRepository;
import com.internship.epayment.service.MesajService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesajServiceImpl implements MesajService {

    @Autowired
    private MesajRepository mesajRepository;

    @Override
    public List<Mesaj> getAll() {
        return mesajRepository.findAll();
    }

    @Override
    public Mesaj findById(Long id) throws NotFoundException {
        return mesajRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public Mesaj addMesaj(Mesaj mesaj) {
        return mesajRepository.save(mesaj);
    }

    @Override
    public Mesaj updateMesaj(Mesaj mesaj) {
        return mesajRepository.save(mesaj);
    }

    @Override
    public void deleteMesaj(Mesaj mesaj) {
        mesajRepository.delete(mesaj);
    }
}
