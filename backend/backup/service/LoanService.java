package com.bankingsystem.service;

import com.bankingsystem.dto.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface LoanService {
    LoanResponse applyLoan(String email, LoanRequest request);
    List<LoanResponse> getLoans(String email);
    LoanResponse getLoanById(String email, Long id);
    Map<String, BigDecimal> calculateEmi(BigDecimal amount, BigDecimal interestRate, Integer tenureMonths);
    LoanResponse updateLoanStatus(Long id, String status);
}
