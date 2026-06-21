package com.bankingsystem.service.impl;

import com.bankingsystem.dto.BeneficiaryDTO;
import com.bankingsystem.entity.Beneficiary;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.DuplicateResourceException;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.BeneficiaryRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.BeneficiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class BeneficiaryServiceImpl implements BeneficiaryService {

    private final BeneficiaryRepository beneficiaryRepository;
    private final UserRepository userRepository;

    @Override
    public BeneficiaryDTO addBeneficiary(Long userId, BeneficiaryDTO beneficiaryDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (beneficiaryRepository.existsByUserIdAndAccountNumber(userId, beneficiaryDTO.getAccountNumber())) {
            throw new DuplicateResourceException("Beneficiary with this account number already exists");
        }

        Beneficiary beneficiary = Beneficiary.builder()
                .name(beneficiaryDTO.getName())
                .accountNumber(beneficiaryDTO.getAccountNumber())
                .ifscCode(beneficiaryDTO.getIfscCode())
                .bankName(beneficiaryDTO.getBankName())
                .status("PENDING")
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        return mapToDTO(beneficiaryRepository.save(beneficiary));
    }

    @Override
    public List<BeneficiaryDTO> getBeneficiariesByUserId(Long userId) {
        return beneficiaryRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BeneficiaryDTO updateBeneficiaryStatus(Long id, String status) {
        Beneficiary beneficiary = beneficiaryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found"));
        beneficiary.setStatus(status);
        return mapToDTO(beneficiaryRepository.save(beneficiary));
    }

    @Override
    public void deleteBeneficiary(Long id) {
        if (!beneficiaryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Beneficiary not found");
        }
        beneficiaryRepository.deleteById(id);
    }

    private BeneficiaryDTO mapToDTO(Beneficiary beneficiary) {
        return BeneficiaryDTO.builder()
                .id(beneficiary.getId())
                .name(beneficiary.getName())
                .accountNumber(beneficiary.getAccountNumber())
                .ifscCode(beneficiary.getIfscCode())
                .bankName(beneficiary.getBankName())
                .status(beneficiary.getStatus())
                .userId(beneficiary.getUser().getId())
                .createdAt(beneficiary.getCreatedAt())
                .build();
    }
}
