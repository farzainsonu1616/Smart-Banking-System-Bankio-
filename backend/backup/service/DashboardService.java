package com.bankingsystem.service;

import com.bankingsystem.dto.DashboardResponse;
import java.util.Map;

public interface DashboardService {
    DashboardResponse getSummary(String email);
    Map<String, Object> getChartData(String email);
}
