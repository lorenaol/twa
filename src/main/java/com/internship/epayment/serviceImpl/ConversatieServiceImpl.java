package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Conversatie;
import com.internship.epayment.repository.AnuntRepository;
import com.internship.epayment.repository.ConversatieRepository;
import com.internship.epayment.service.ConversatieService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversatieServiceImpl implements ConversatieService {

    @Autowired
    private ConversatieRepository conversatieRepository;

    @Override
    public List<Conversatie> getAll() {
        return conversatieRepository.findAll();
    }

    @Override
    public Conversatie findById(Long id) throws NotFoundException {
        return conversatieRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public Conversatie addConversatie(Conversatie conversatie) {
        return conversatieRepository.save(conversatie);
    }

    @Override
    public Conversatie updateConversatie(Conversatie conversatie) {
        return conversatieRepository.save(conversatie);
    }

    @Override
    public void deleteConversatie(Conversatie conversatie) {
        conversatieRepository.delete(conversatie);
    }
}
