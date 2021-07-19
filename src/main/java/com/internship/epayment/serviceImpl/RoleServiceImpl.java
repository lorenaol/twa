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

import java.util.ArrayList;
import java.util.List;


@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;


    /*@Override
    public List<Role> getAll() {
        List<Role> list = new ArrayList<Role>();
        roleRepository.findAll().forEach(list::add);
        return list;
    }*/

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
        Page<Role> result = null;
      /*  if (!params.get(0).equals("")){
            result = roleRepository.findRolesById(Long.valueOf(params.get(0)));
        }
        if (!params.get(1).equals("")){
            if(result != null) {
                result.retainAll(roleRepository.findRolesByName(params.get(1)));
            } else {
                result = roleRepository.findRolesByName(params.get(1));
            }
        }*/
        if (!params.get(2).equals("")){
            if(result != null) {
               // result.retainAll(roleRepository.findRolesByCode(params.get(2), pageable));
            } else {
                result = roleRepository.findRolesByCode(params.get(2), pageable);
            }
        }
        if(result==null) {
          result = roleRepository.findAll(pageable);
        }
        return result;
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
