package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import com.internship.epayment.repository.ProductRepository;
import com.internship.epayment.repository.RoleRepository;
import com.internship.epayment.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public List<Role> getAll() {
        List<Role> list = new ArrayList<Role>();
        roleRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Role findById(Long id) throws NotFoundException {
        return roleRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    public List <Role> findByName(String name){
        return roleRepository.findRolesByName(name);
    }

    public Role findByCode(String code){
        return roleRepository.findRoleByCode(code);
    }

    @Override
    @Transactional
    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    @Transactional
    public Role updateRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    @Transactional
    public void deleteRole(Role role) {
        roleRepository.delete(role);
    }
}
