package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.UserDTO;
import com.bankingsystem.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    private final AdminService adminService;
    private final com.bankingsystem.service.LoanService loanService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success("Users fetched successfully", adminService.getAllUsers()));
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully", adminService.getUserById(id)));
    }

    @PutMapping("/users/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> approveUser(@PathVariable Long id) {
        adminService.approveUser(id);
        return ResponseEntity.ok(ApiResponse.success("User approved successfully", null));
    }

    @PutMapping("/users/{id}/freeze")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> freezeUser(@PathVariable Long id) {
        adminService.freezeUser(id);
        return ResponseEntity.ok(ApiResponse.success("User frozen successfully", null));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    @GetMapping("/dashboard/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStatistics() {
        return ResponseEntity.ok(ApiResponse.success("Statistics fetched successfully", adminService.getDashboardStatistics()));
    }

    @GetMapping("/loans")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<com.bankingsystem.dto.LoanDTO>>> getAllLoans() {
        return ResponseEntity.ok(ApiResponse.success("Loans fetched successfully", loanService.getAllLoans()));
    }
}
