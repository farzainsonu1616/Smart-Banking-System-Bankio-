package com.bankingsystem.controller;

import com.bankingsystem.dto.AccountDTO;
import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.bankingsystem.entity.User;
import com.bankingsystem.repository.UserRepository;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccountController {

    private final AccountService accountService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<AccountDTO>> createAccount(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        String accountType = request.get("accountType").toString();
        Long branchId = request.get("branchId") != null ? Long.valueOf(request.get("branchId").toString()) : 1L;

        AccountDTO newAccount = accountService.createAccount(userId, accountType, branchId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Account created successfully", newAccount));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<AccountDTO>> getAccountById(@PathVariable Long id) {
        AccountDTO account = accountService.getAccountById(id);
        return ResponseEntity.ok(ApiResponse.success("Account fetched successfully", account));
    }

    @GetMapping("/number/{accountNumber}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<AccountDTO>> getAccountByNumber(@PathVariable String accountNumber) {
        AccountDTO account = accountService.getAccountByNumber(accountNumber);
        return ResponseEntity.ok(ApiResponse.success("Account fetched successfully", account));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<AccountDTO>>> getAccountsByUserId(@PathVariable Long userId) {
        List<AccountDTO> accounts = accountService.getAccountsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Accounts fetched successfully", accounts));
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<AccountDTO>>> getUserAccounts() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        List<AccountDTO> accounts = accountService.getAccountsByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Accounts fetched successfully", accounts));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AccountDTO>> updateAccountStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        AccountDTO updatedAccount = accountService.updateAccountStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Account status updated successfully", updatedAccount));
    }
}
