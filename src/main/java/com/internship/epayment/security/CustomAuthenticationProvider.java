package com.internship.epayment.security;

import com.internship.epayment.entity.Authority;
import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.entity.User;
import com.internship.epayment.entity.UserRole;
import com.internship.epayment.repository.RoleAuthorityRepository;
import com.internship.epayment.repository.UserRepository;
import com.internship.epayment.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleAuthorityRepository roleAuthorityRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        Optional<User> userOptional = userRepository.findUserByName(name);

        if (!userOptional.isPresent()) {
            System.err.println("User not found: " + name);
            throw new UsernameNotFoundException("");
        }
        User user = userOptional.get();

        if (!password.equals(user.getPassword())) {
            System.err.println("Wrong password!");
            throw new BadCredentialsException("");
        }

        List<GrantedAuthority> authorities = getAuthoritiesOfUser(user);

        return new UsernamePasswordAuthenticationToken(name, password, authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    private List<GrantedAuthority> getAuthoritiesOfUser(User user) {
        List<Authority> authorities = new ArrayList<>();
        List<UserRole> userRoles = userRoleRepository.findAllByUserId(user.getId());
        userRoles.forEach(userRole -> {
            // Get all Authorities Of Role
            List<Authority> authoritiesOfRole = roleAuthorityRepository.findAllByRoleId(userRole.getRole().getId())
                    .stream().map(RoleAuthority::getAuthority).collect(Collectors.toList());
            // Add Authority if not already added
            authoritiesOfRole.forEach(authority -> {
                if (!authorities.contains(authority)) {
                    authorities.add(authority);
                }
            });
        });
        return authorities.stream()
                .map(Authority::getCode)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
