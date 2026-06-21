package com.bankingsystem.service;

import com.bankingsystem.dto.DashboardChartDTO;
import com.bankingsystem.dto.DashboardSummaryDTO;

public interface UserDashboardService {
    DashboardSummaryDTO getSummary(String email);
    DashboardChartDTO getChartData(String email);
}
