package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.TransactionDTO;
import com.bankingsystem.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/deposit")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<TransactionDTO>> deposit(@RequestBody Map<String, Object> request) {
        Long accountId = Long.valueOf(request.get("accountId").toString());
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String description = request.get("description") != null ? request.get("description").toString() : "Deposit";

        TransactionDTO transaction = transactionService.deposit(accountId, amount, description);
        return ResponseEntity.ok(ApiResponse.success("Deposit successful", transaction));
    }

    @PostMapping("/withdraw")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<TransactionDTO>> withdraw(@RequestBody Map<String, Object> request) {
        Long accountId = Long.valueOf(request.get("accountId").toString());
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String description = request.get("description") != null ? request.get("description").toString() : "Withdrawal";

        TransactionDTO transaction = transactionService.withdraw(accountId, amount, description);
        return ResponseEntity.ok(ApiResponse.success("Withdrawal successful", transaction));
    }

    @PostMapping("/transfer")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<TransactionDTO>> transfer(@RequestBody Map<String, Object> request) {
        Long sourceAccountId = Long.valueOf(request.get("sourceAccountId").toString());
        Long targetAccountId = Long.valueOf(request.get("targetAccountId").toString());
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String description = request.get("description") != null ? request.get("description").toString() : "Transfer";

        TransactionDTO transaction = transactionService.transfer(sourceAccountId, targetAccountId, amount, description);
        return ResponseEntity.ok(ApiResponse.success("Transfer successful", transaction));
    }

    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> getTransactionsByAccount(@PathVariable Long accountId) {
        List<TransactionDTO> transactions = transactionService.getTransactionsByAccountId(accountId);
        return ResponseEntity.ok(ApiResponse.success("Transactions fetched successfully", transactions));
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> getUserTransactions() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        List<TransactionDTO> transactions = transactionService.getTransactionsByUser(email);
        return ResponseEntity.ok(ApiResponse.success("Transactions fetched successfully", transactions));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<TransactionDTO>> getTransactionById(@PathVariable Long id) {
        TransactionDTO transaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(ApiResponse.success("Transaction fetched successfully", transaction));
    }
}
