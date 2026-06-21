package com.bankingsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryDTO {
    private String userName;
    private BigDecimal totalBalance;
    private int totalAccounts;
    private int activeLoans;
    private int activeCards;
    private List<TransactionDTO> recentTransactions;
}
