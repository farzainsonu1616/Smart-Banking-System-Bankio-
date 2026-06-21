package com.bankingsystem.controller;

import com.bankingsystem.dto.*;
import com.bankingsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardResponse>> getSummary(Authentication auth) {
        DashboardResponse response = dashboardService.getSummary(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Dashboard data fetched", response));
    }

    @GetMapping("/chart-data")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getChartData(Authentication auth) {
        Map<String, Object> data = dashboardService.getChartData(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Chart data fetched", data));
    }
}
