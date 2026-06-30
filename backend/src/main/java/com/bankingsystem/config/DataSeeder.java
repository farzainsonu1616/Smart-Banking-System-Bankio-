package com.bankingsystem.config;

import com.bankingsystem.entity.Role;
import com.bankingsystem.entity.User;
import com.bankingsystem.repository.RoleRepository;
import com.bankingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        Role customerRole = roleRepository.findByName("CUSTOMER").orElseGet(() -> roleRepository.save(new Role(null, "CUSTOMER")));
        Role adminRole = roleRepository.findByName("ADMIN").orElseGet(() -> roleRepository.save(new Role(null, "ADMIN")));
        Role managerRole = roleRepository.findByName("MANAGER").orElseGet(() -> roleRepository.save(new Role(null, "MANAGER")));
        Role superAdminRole = roleRepository.findByName("SUPER_ADMIN").orElseGet(() -> roleRepository.save(new Role(null, "SUPER_ADMIN")));

        User customer = userRepository.findByEmail("customer@bankio.com").orElse(null);
        if (customer == null) {
            customer = User.builder()
                    .fullName("Demo Customer")
                    .email("customer@bankio.com")
                    .isEnabled(true)
                    .build();
        }
        customer.setPassword(passwordEncoder.encode("Customer@123"));
        customer.setRoles(Set.of(customerRole));
        userRepository.save(customer);

        User admin = userRepository.findByEmail("admin@bankio.com").orElse(null);
        if (admin == null) {
            admin = User.builder()
                    .fullName("Admin User")
                    .email("admin@bankio.com")
                    .isEnabled(true)
                    .build();
        }
        admin.setPassword(passwordEncoder.encode("Admin@123"));
        admin.setRoles(Set.of(adminRole));
        userRepository.save(admin);

        User manager = userRepository.findByEmail("manager@bankio.com").orElse(null);
        if (manager == null) {
            manager = User.builder()
                    .fullName("Manager User")
                    .email("manager@bankio.com")
                    .isEnabled(true)
                    .build();
        }
        manager.setPassword(passwordEncoder.encode("Manager@123"));
        manager.setRoles(Set.of(managerRole));
        userRepository.save(manager);

        User superAdmin = userRepository.findByEmail("superadmin@bankio.com").orElse(null);
        if (superAdmin == null) {
            superAdmin = User.builder()
                    .fullName("Super Admin User")
                    .email("superadmin@bankio.com")
                    .isEnabled(true)
                    .build();
        }
        superAdmin.setPassword(passwordEncoder.encode("SuperAdmin@123"));
        superAdmin.setRoles(Set.of(superAdminRole));
        userRepository.save(superAdmin);

        User farzain = userRepository.findByEmail("farzain@smartbank.com").orElse(null);
        if (farzain == null) {
            farzain = User.builder()
                    .fullName("Farzain Admin")
                    .email("farzain@smartbank.com")
                    .password(passwordEncoder.encode("Farzain@123"))
                    .isEnabled(true)
                    .build();
        }
        farzain.setRoles(Set.of(superAdminRole));
        userRepository.save(farzain);
    }
}
