package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.LoanDTO;
import com.bankingsystem.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.bankingsystem.entity.User;
import com.bankingsystem.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoanController {

    private final LoanService loanService;
    private final UserRepository userRepository;

    @PostMapping("/apply/{userId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<LoanDTO>> applyForLoan(
            @PathVariable Long userId,
            @RequestBody LoanDTO loanDTO) {
        LoanDTO newLoan = loanService.applyForLoan(userId, loanDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Loan application submitted successfully", newLoan));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<LoanDTO>>> getLoansByUser(@PathVariable Long userId) {
        List<LoanDTO> loans = loanService.getLoansByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Loans fetched successfully", loans));
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<LoanDTO>>> getUserLoans() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        List<LoanDTO> loans = loanService.getLoansByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Loans fetched successfully", loans));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<LoanDTO>> getLoanById(@PathVariable Long id) {
        LoanDTO loan = loanService.getLoanById(id);
        return ResponseEntity.ok(ApiResponse.success("Loan fetched successfully", loan));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LoanDTO>> updateLoanStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        LoanDTO updatedLoan = loanService.updateLoanStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Loan status updated successfully", updatedLoan));
    }
}
