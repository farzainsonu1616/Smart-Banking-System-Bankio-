package com.bankingsystem.service.impl;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.*;
import com.bankingsystem.exception.*;
import com.bankingsystem.repository.*;
import com.bankingsystem.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@SuppressWarnings("null")
public class LoanServiceImpl implements LoanService {

    @Autowired private LoanRepository loanRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private AccountRepository accountRepository;

    @Override
    public LoanResponse applyLoan(String email, LoanRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Account account = null;
        if (request.getAccountId() != null) {
            account = accountRepository.findById(request.getAccountId())
                    .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        }

        Map<String, BigDecimal> emiData = calculateEmi(request.getAmount(), request.getInterestRate(), request.getTenureMonths());

        Loan loan = Loan.builder()
                .user(user)
                .account(account)
                .loanType(Loan.LoanType.valueOf(request.getLoanType().toUpperCase()))
                .amount(request.getAmount())
                .interestRate(request.getInterestRate())
                .tenureMonths(request.getTenureMonths())
                .monthlyEmi(emiData.get("monthlyEmi"))
                .totalPayable(emiData.get("totalPayable"))
                .amountPaid(BigDecimal.ZERO)
                .status(Loan.LoanStatus.PENDING)
                .purpose(request.getPurpose())
                .appliedDate(LocalDateTime.now())
                .build();

        loanRepository.save(loan);
        return mapToResponse(loan);
    }

    @Override
    public List<LoanResponse> getLoans(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return loanRepository.findByUserId(user.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public LoanResponse getLoanById(String email, Long id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        return mapToResponse(loan);
    }

    @Override
    public Map<String, BigDecimal> calculateEmi(BigDecimal amount, BigDecimal interestRate, Integer tenureMonths) {
        BigDecimal monthlyRate = interestRate.divide(BigDecimal.valueOf(1200), 10, RoundingMode.HALF_UP);
        BigDecimal onePlusR = BigDecimal.ONE.add(monthlyRate);
        double power = Math.pow(onePlusR.doubleValue(), tenureMonths);
        BigDecimal emi = amount.multiply(monthlyRate).multiply(BigDecimal.valueOf(power))
                .divide(BigDecimal.valueOf(power - 1), 2, RoundingMode.HALF_UP);
        BigDecimal totalPayable = emi.multiply(BigDecimal.valueOf(tenureMonths)).setScale(2, RoundingMode.HALF_UP);

        Map<String, BigDecimal> result = new HashMap<>();
        result.put("monthlyEmi", emi);
        result.put("totalPayable", totalPayable);
        result.put("totalInterest", totalPayable.subtract(amount));
        return result;
    }

    @Override
    public LoanResponse updateLoanStatus(Long id, String status) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        loan.setStatus(Loan.LoanStatus.valueOf(status.toUpperCase()));
        if ("APPROVED".equalsIgnoreCase(status)) {
            loan.setApprovedDate(LocalDateTime.now());
        }
        loanRepository.save(loan);
        return mapToResponse(loan);
    }

    private LoanResponse mapToResponse(Loan loan) {
        return LoanResponse.builder()
                .id(loan.getId())
                .loanType(loan.getLoanType().name())
                .amount(loan.getAmount())
                .interestRate(loan.getInterestRate())
                .tenureMonths(loan.getTenureMonths())
                .monthlyEmi(loan.getMonthlyEmi())
                .totalPayable(loan.getTotalPayable())
                .amountPaid(loan.getAmountPaid())
                .status(loan.getStatus().name())
                .purpose(loan.getPurpose())
                .accountNumber(loan.getAccount() != null ? loan.getAccount().getAccountNumber() : null)
                .appliedDate(loan.getAppliedDate())
                .approvedDate(loan.getApprovedDate())
                .build();
    }
}
