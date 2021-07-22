package com.internship.epayment.service;

import com.internship.epayment.entity.RoleAuthority;
import javassist.NotFoundException;

import java.util.List;

public interface RoleAuthorityService {
    List<RoleAuthority> getAll();

    RoleAuthority findById(Long id) throws NotFoundException;

    RoleAuthority addRoleAuthority(RoleAuthority roleAuthority);

    RoleAuthority updateRoleAuthority(RoleAuthority roleAuthority);

    void deleteRoleAuthority(RoleAuthority roleAuthority);
}
