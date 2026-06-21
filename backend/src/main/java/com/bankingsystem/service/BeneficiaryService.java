package com.bankingsystem.service;

import com.bankingsystem.dto.BeneficiaryDTO;
import java.util.List;

public interface BeneficiaryService {
    BeneficiaryDTO addBeneficiary(Long userId, BeneficiaryDTO beneficiaryDTO);
    List<BeneficiaryDTO> getBeneficiariesByUserId(Long userId);
    BeneficiaryDTO updateBeneficiaryStatus(Long id, String status);
    void deleteBeneficiary(Long id);
}
