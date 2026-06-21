package com.bankingsystem.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class DashboardResponse {
    private String userName;
    private BigDecimal totalBalance;
    private int totalAccounts;
    private int totalTransactions;
    private int activeLoans;
    private int activeCards;
    private BigDecimal totalLoanAmount;
    private BigDecimal totalLoanPaid;
    private List<TransactionResponse> recentTransactions;
    private List<AccountResponse> accounts;
    private Map<String, Object> chartData;
}
