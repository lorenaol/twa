package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Solicitare_Colaborare;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.SolicitareColaborareRepository;
import com.internship.epayment.service.SolicitareColaborareService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitareColaborareServiceImpl implements SolicitareColaborareService {

    @Autowired
    private SolicitareColaborareRepository solicitareColaborareRepository;

    @Override
    public List<Solicitare_Colaborare> getAll() {
        return solicitareColaborareRepository.findAll();
    }

    @Override
    public Solicitare_Colaborare findById(Long id) throws NotFoundException {
        return solicitareColaborareRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public Solicitare_Colaborare addSolicitareColaborare(Solicitare_Colaborare solicitareColaborare) {
        return solicitareColaborareRepository.save(solicitareColaborare);
    }

    @Override
    public Solicitare_Colaborare updateSolicitareColaborare(Solicitare_Colaborare solicitareColaborare) {
        return solicitareColaborareRepository.save(solicitareColaborare);
    }

    @Override
    public void deleteSolicitareColaborare(Solicitare_Colaborare solicitareColaborare) {
        solicitareColaborareRepository.delete(solicitareColaborare);
    }
}
