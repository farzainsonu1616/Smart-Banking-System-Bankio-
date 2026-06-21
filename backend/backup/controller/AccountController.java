package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping
    public ResponseEntity<ApiResponse<AccountResponse>> createAccount(Authentication auth, @Valid @RequestBody AccountRequest request) {
        AccountResponse response = accountService.createAccount(auth.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Account created successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AccountResponse>>> getAccounts(Authentication auth) {
        List<AccountResponse> accounts = accountService.getAccounts(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Accounts fetched successfully", accounts));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccountById(Authentication auth, @PathVariable Long id) {
        AccountResponse account = accountService.getAccountById(auth.getName(), id);
        return ResponseEntity.ok(ApiResponse.success("Account fetched successfully", account));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> updateAccount(Authentication auth, @PathVariable Long id, @RequestBody AccountRequest request) {
        AccountResponse account = accountService.updateAccount(auth.getName(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Account updated successfully", account));
    }
}
