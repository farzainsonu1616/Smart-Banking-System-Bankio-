package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.*;
import com.bankingsystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@SuppressWarnings("null")
public class AdminController {

    @Autowired private UserRepository userRepository;
    @Autowired private AccountRepository accountRepository;
    @Autowired private LoanRepository loanRepository;
    @Autowired private TransactionRepository transactionRepository;
    @Autowired private CardRepository cardRepository;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getUsers() {
        return ResponseEntity.ok(ApiResponse.success("Users fetched", userRepository.findAll()));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(ApiResponse.success("User fetched", user));
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<?>> toggleUserStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsActive(request.get("isActive"));
        userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success("User status updated"));
    }

    @GetMapping("/accounts")
    public ResponseEntity<ApiResponse<List<Account>>> getAllAccounts() {
        return ResponseEntity.ok(ApiResponse.success("Accounts fetched", accountRepository.findAll()));
    }

    @GetMapping("/loans")
    public ResponseEntity<ApiResponse<List<Loan>>> getAllLoans() {
        return ResponseEntity.ok(ApiResponse.success("Loans fetched", loanRepository.findAll()));
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<List<Transaction>>> getAllTransactions() {
        return ResponseEntity.ok(ApiResponse.success("Transactions fetched", transactionRepository.findAll()));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalAccounts", accountRepository.count());
        stats.put("totalLoans", loanRepository.count());
        stats.put("totalTransactions", transactionRepository.count());
        stats.put("totalCards", cardRepository.count());
        stats.put("pendingLoans", loanRepository.findByStatus(Loan.LoanStatus.PENDING).size());
        return ResponseEntity.ok(ApiResponse.success("Stats fetched", stats));
    }
}
