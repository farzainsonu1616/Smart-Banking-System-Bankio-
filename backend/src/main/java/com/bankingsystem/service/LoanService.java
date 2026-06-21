package com.bankingsystem.service;

import com.bankingsystem.dto.LoanDTO;
import java.util.List;

public interface LoanService {
    LoanDTO applyForLoan(Long userId, LoanDTO loanDTO);
    List<LoanDTO> getLoansByUserId(Long userId);
    LoanDTO getLoanById(Long id);
    LoanDTO updateLoanStatus(Long id, String status);
    List<LoanDTO> getAllLoans();
}
