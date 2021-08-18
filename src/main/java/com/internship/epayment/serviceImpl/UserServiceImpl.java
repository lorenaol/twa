package com.internship.epayment.serviceImpl;

import com.internship.epayment.dto.UserWithAuthoritiesDto;
import com.internship.epayment.entity.Role;
import com.internship.epayment.entity.RoleAuthority;
import com.internship.epayment.entity.User;
import com.internship.epayment.repository.RoleAuthorityRepository;
import com.internship.epayment.repository.UserRepository;
import com.internship.epayment.repository.UserRoleRepository;
import com.internship.epayment.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private static final long EXPIRE_TOKEN_AFTER_MINUTES = 30;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleAuthorityRepository roleAuthorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public User findById(Long id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("Nu exista!"));
    }

    @Override
    public User findByName(String name) throws NotFoundException {
        Optional<User> user = userRepository.findUserByName(name);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + name));
        return user.get();
    }
    @Override
    public String findPassByName(String name){
        Optional<User> user = userRepository.findUserByName(name);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + name));
        return user.get().getPassword();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User findByToken(String token) {
        return userRepository.findUserByToken(token);
    }

    @Override
    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
       // user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public Page<User> filter(List<String> params, Pageable pageable) {
        String id = params.get(0);
        String name = params.get(1);
        String email = params.get(2);
        if (!id.equals("") && !name.equals("") && !email.equals("")) {
            return userRepository.findByNameAndEmailAndId(name, email, Long.valueOf(id), pageable);
        }
        if (!id.equals("") && !name.equals("")) {
            return userRepository.findByIdAndName(Long.valueOf(id), name, pageable);
        }
        if (!name.equals("") && !email.equals("")) {
            return userRepository.findByNameAndEmail(name, email, pageable);
        }
        if (!id.equals("") && !email.equals("")) {
            return userRepository.findByIdAndEmail(Long.valueOf(id), email, pageable);
        }
        if (!id.equals("")) {
            return userRepository.findById(Long.valueOf(id), pageable);
        }
        if (!name.equals("")) {
            return userRepository.findByName(name, pageable);
        }
        if (!email.equals("")) {
            return userRepository.findByEmail(email, pageable);
        }
        return userRepository.findAll(pageable);
    }

    @Override
    public UserWithAuthoritiesDto getUserWithAuthorities(String currentUserEmail) throws NotFoundException {
        //pas 1.getUser de pe currentUserName
        User user = findByEmail(currentUserEmail);
        System.out.println(user.getName());
        //pas 2.luam rolurile userului
        List<Role> roles = new ArrayList<>();
        userRoleRepository.findAllByUserId(user.getId()).forEach(userRole -> roles.add(userRole.getRole()));

//        List<Role> roles = userRoleRepository.findAllByUserId(user.getId())
//                .stream().map(UserRole::getRole).collect(Collectors.toList());

        //pas 3.luam permisiunile rolurilor
        List<String> authorities = new ArrayList<>();
        roles.forEach(role -> {
            // Luam Role Authities din baza dupa id
            List<RoleAuthority> roleAuthorities = roleAuthorityRepository.findAllByRoleId(role.getId());
            // Luam Authities && Luam codurile
            roleAuthorities.forEach(roleAuthority -> {
                authorities.add(roleAuthority.getAuthority().getCode());
            });

//            authorities.addAll(
//                            roleAuthorityRepository.findAllByRoleId(role.getId())
//                            .stream().map(RoleAuthority::getAuthority).map(Authority::getCode)
//                            .collect(Collectors.toList()));
        });

        //pas 4.bagam ce ne intereseaza in dto si il returnam
        return new UserWithAuthoritiesDto(currentUserEmail, authorities);
    }

    public String forgotPassword(String email) {

        Optional<User> userOptional = Optional
                .ofNullable(userRepository.findUserByEmail(email));

        if (!userOptional.isPresent()) {
            return "Invalid email id.";
        }

        User user = userOptional.get();
        user.setToken(generateToken());

        LocalDateTime time = LocalDateTime.now();

        System.out.println(time);

        user.setTokenCreationDate(time);
        user = userRepository.save(user);

        return user.getToken();
    }

    public String resetPassword(String token, String password) {

        Optional<User> userOptional = Optional
                .ofNullable(userRepository.findUserByToken(token));

        if (!userOptional.isPresent()) {
            return "Invalid token.";
        }

        LocalDateTime tokenCreationDate = userOptional.get().getTokenCreationDate();

        if (isTokenExpired(tokenCreationDate)) {
            return "Token expired.";
        }

        User user = userOptional.get();

      // user.setPassword(password);
        user.setPassword(passwordEncoder.encode(password));
        user.setToken(null);
        user.setTokenCreationDate(null);

        userRepository.save(user);

        return "Your password successfully updated.";
    }

    /**
     * Generate unique token. You may add multiple parameters to create a strong
     * token.
     *
     * @return unique token
     */
    private String generateToken() {
        StringBuilder token = new StringBuilder();

        return token.append(UUID.randomUUID().toString())
                .append(UUID.randomUUID().toString()).toString();
    }

    /**
     * Check whether the created token expired or not.
     *
     * @param tokenCreationDate
     * @return true or false
     */
    private boolean isTokenExpired(final LocalDateTime tokenCreationDate) {

        LocalDateTime now = LocalDateTime.now();
        Duration diff = Duration.between(tokenCreationDate, now);

        return diff.toMinutes() >= EXPIRE_TOKEN_AFTER_MINUTES;
    }



}

