package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.BeneficiaryDTO;
import com.bankingsystem.service.BeneficiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts/beneficiaries")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;

    @PostMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<BeneficiaryDTO>> addBeneficiary(
            @PathVariable Long userId,
            @RequestBody BeneficiaryDTO beneficiaryDTO) {
        BeneficiaryDTO createdBeneficiary = beneficiaryService.addBeneficiary(userId, beneficiaryDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Beneficiary added successfully", createdBeneficiary));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<BeneficiaryDTO>>> getBeneficiariesByUserId(@PathVariable Long userId) {
        List<BeneficiaryDTO> beneficiaries = beneficiaryService.getBeneficiariesByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Beneficiaries fetched successfully", beneficiaries));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BeneficiaryDTO>> updateBeneficiaryStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        BeneficiaryDTO updatedBeneficiary = beneficiaryService.updateBeneficiaryStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Beneficiary status updated successfully", updatedBeneficiary));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteBeneficiary(@PathVariable Long id) {
        beneficiaryService.deleteBeneficiary(id);
        return ResponseEntity.ok(ApiResponse.success("Beneficiary deleted successfully", null));
    }
}
