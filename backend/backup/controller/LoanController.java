package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<LoanResponse>> applyLoan(Authentication auth, @Valid @RequestBody LoanRequest request) {
        LoanResponse response = loanService.applyLoan(auth.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Loan application submitted", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LoanResponse>>> getLoans(Authentication auth) {
        List<LoanResponse> loans = loanService.getLoans(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Loans fetched", loans));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LoanResponse>> getLoanById(Authentication auth, @PathVariable Long id) {
        LoanResponse loan = loanService.getLoanById(auth.getName(), id);
        return ResponseEntity.ok(ApiResponse.success("Loan fetched", loan));
    }

    @PostMapping("/calculate-emi")
    public ResponseEntity<ApiResponse<Map<String, BigDecimal>>> calculateEmi(@RequestBody LoanRequest request) {
        Map<String, BigDecimal> result = loanService.calculateEmi(request.getAmount(), request.getInterestRate(), request.getTenureMonths());
        return ResponseEntity.ok(ApiResponse.success("EMI calculated", result));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LoanResponse>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        LoanResponse loan = loanService.updateLoanStatus(id, request.get("status"));
        return ResponseEntity.ok(ApiResponse.success("Loan status updated", loan));
    }
}
