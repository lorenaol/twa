package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import com.internship.epayment.repository.ProductRepository;
import com.internship.epayment.repository.RoleRepository;
import com.internship.epayment.service.ProductService;
import com.internship.epayment.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        Role role = roleRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
        return  role;
    }

    @Override
    public List<Role> findByCode(String code) {
        return roleRepository.findRolesByCode(code);
    }

    @Override
    public Role addRole(Role role) {
        Role p = roleRepository.save(role);
        return p;
    }

    @Override
    public Role updateRole(Role role) {
        Role p = roleRepository.save(role);
        return p;
    }

    @Override
    public List<Role> findByName(String name) {
        return roleRepository.findRolesByName(name);
    }

    @Override
    public void deleteRole(Role role) {
        roleRepository.delete(role);
    }
}
