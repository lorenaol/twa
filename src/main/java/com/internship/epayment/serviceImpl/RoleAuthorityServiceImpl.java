package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.repository.ProductRepository;
import com.internship.epayment.repository.RoleAuthorityRepository;
import com.internship.epayment.repository.RoleRepository;
import com.internship.epayment.service.ProductService;
import com.internship.epayment.service.RoleAuthorityService;
import com.internship.epayment.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class RoleAuthorityServiceImpl implements RoleAuthorityService{
    @Autowired
    private RoleAuthorityRepository roleAuthorityRepository;


    @Override
    public List<RoleAuthority> getAll() {
        List<RoleAuthority> list = new ArrayList<RoleAuthority>();
        roleAuthorityRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public RoleAuthority findById(Long id) throws NotFoundException {
        RoleAuthority roleAuthority = roleAuthorityRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
        return  roleAuthority;
    }


    @Override
    public RoleAuthority updateRoleAuthority(RoleAuthority roleAuthority) {
        RoleAuthority p = roleAuthorityRepository.save(roleAuthority);
        return p;
    }

    @Override
    public void deleteRoleAuthority(RoleAuthority roleAuthority) {
        roleAuthorityRepository.delete(roleAuthority);
    }

    @Override
    public List<RoleAuthority> findByEndDate(Date date) {
        return roleAuthorityRepository.findRoleAuthoritiesByEndDate(date);
    }
    @Override
    public List<RoleAuthority> findByStartDate(Date date) {
        return roleAuthorityRepository.findRoleAuthoritiesByEndDate(date);
    }

    @Override
    public RoleAuthority addRoleAuthority(RoleAuthority roleAuthority) {
        return null;
    }

}
