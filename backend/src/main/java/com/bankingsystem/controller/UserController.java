package com.bankingsystem.controller;

import com.bankingsystem.dto.ApiResponse;
import com.bankingsystem.dto.DashboardChartDTO;
import com.bankingsystem.dto.DashboardSummaryDTO;
import com.bankingsystem.service.UserDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserDashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummaryDTO>> getSummary() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        DashboardSummaryDTO summary = dashboardService.getSummary(email);
        return ResponseEntity.ok(ApiResponse.success("Dashboard summary fetched successfully", summary));
    }

    @GetMapping("/chart-data")
    public ResponseEntity<ApiResponse<DashboardChartDTO>> getChartData() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        DashboardChartDTO chartData = dashboardService.getChartData(email);
        return ResponseEntity.ok(ApiResponse.success("Dashboard chart data fetched successfully", chartData));
    }
}
