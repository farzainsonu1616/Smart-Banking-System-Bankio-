package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/deposit")
    public ResponseEntity<ApiResponse<TransactionResponse>> deposit(Authentication auth, @Valid @RequestBody TransactionRequest request) {
        TransactionResponse response = transactionService.deposit(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Deposit successful", response));
    }

    @PostMapping("/withdraw")
    public ResponseEntity<ApiResponse<TransactionResponse>> withdraw(Authentication auth, @Valid @RequestBody TransactionRequest request) {
        TransactionResponse response = transactionService.withdraw(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Withdrawal successful", response));
    }

    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse<TransactionResponse>> transfer(Authentication auth, @Valid @RequestBody TransactionRequest request) {
        TransactionResponse response = transactionService.transfer(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Transfer successful", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getHistory(Authentication auth) {
        List<TransactionResponse> transactions = transactionService.getTransactionHistory(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Transactions fetched", transactions));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TransactionResponse>> getById(Authentication auth, @PathVariable Long id) {
        TransactionResponse txn = transactionService.getTransactionById(auth.getName(), id);
        return ResponseEntity.ok(ApiResponse.success("Transaction fetched", txn));
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getByAccount(Authentication auth, @PathVariable Long accountId) {
        List<TransactionResponse> txns = transactionService.getTransactionsByAccount(auth.getName(), accountId);
        return ResponseEntity.ok(ApiResponse.success("Transactions fetched", txns));
    }
}
