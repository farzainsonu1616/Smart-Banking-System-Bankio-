package com.bankingsystem.service.impl;

import com.bankingsystem.dto.UserDTO;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.LoanRepository;
import com.bankingsystem.repository.TransactionRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final LoanRepository loanRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToDTO(user);
    }

    @Override
    @Transactional
    public void approveUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void freezeUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setLocked(true);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

    @Override
    public Map<String, Object> getDashboardStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalLoans", loanRepository.count());
        stats.put("totalTransactions", transactionRepository.count());
        
        // Mocking daily volume for simplicity
        stats.put("dailyVolume", 150000.00); 
        
        return stats;
    }

    private UserDTO mapToDTO(User user) {
        String[] nameParts = user.getFullName() != null ? user.getFullName().split(" ", 2) : new String[]{"", ""};
        String firstName = nameParts[0];
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        return UserDTO.builder()
                .id(user.getId())
                .firstName(firstName)
                .lastName(lastName)
                .email(user.getEmail())
                .phone(user.getMobile())
                .username(user.getEmail())
                .isActive(user.isEnabled())
                .isLocked(user.isLocked())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
