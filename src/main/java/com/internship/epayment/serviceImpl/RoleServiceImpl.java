package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Role;
import com.internship.epayment.repository.RoleRepository;
import com.internship.epayment.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public Page<Role> getAll(Pageable pageable) {
        return roleRepository.findAll(pageable);
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
    public List<Role> order(String param, String direction){
        if(direction.equals("asc")) {
            return roleRepository.findAll(Sort.by(Sort.Direction.ASC, param));
        } else {
            return roleRepository.findAll(Sort.by(Sort.Direction.DESC, param));
        }
    }

    @Override
    public Page<Role> filter(List<String> params, Pageable pageable) {
        String id = params.get(0);
        String name = params.get(1);
        String code = params.get(2);
        if(!id.equals("") && !name.equals("") && !code.equals("")) {
            return roleRepository.findByNameAndIdAndCode(name, Long.valueOf(id), code, pageable);
        }
        if(!id.equals("") && !name.equals("")) {
            return roleRepository.findByNameAndId(name, Long.valueOf(id), pageable);
        }
        if(!name.equals("") && !code.equals("")) {
            return roleRepository.findByNameAndCode(name, code, pageable);
        }
        if(!id.equals("") && !code.equals("")) {
            return roleRepository.findByIdAndCode(Long.valueOf(id), code, pageable);
        }
        if(!id.equals("")) {
            return roleRepository.findById(Long.valueOf(id), pageable);
        }
        if(!name.equals("")) {
            return roleRepository.findByName(name, pageable);
        }
        if(!code.equals("")) {
            return roleRepository.findRolesByCode(code, pageable);
        }
        return roleRepository.findAll(pageable);
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
