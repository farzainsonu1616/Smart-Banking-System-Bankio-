package com.bankingsystem.service.impl;

import com.bankingsystem.dto.DashboardChartDTO;
import com.bankingsystem.dto.DashboardSummaryDTO;
import com.bankingsystem.dto.TransactionDTO;
import com.bankingsystem.entity.Account;
import com.bankingsystem.entity.User;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.*;
import com.bankingsystem.service.UserDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDashboardServiceImpl implements UserDashboardService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final LoanRepository loanRepository;
    private final CardRepository cardRepository;
    private final TransactionRepository transactionRepository;

    @Override
    @SuppressWarnings("null")
    public DashboardSummaryDTO getSummary(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Account> accounts = accountRepository.findByUserId(user.getId());
        
        BigDecimal totalBalance = accounts.stream()
                .map(Account::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int activeLoans = loanRepository.findByUserId(user.getId()).stream()
                .filter(l -> l.getStatus().equals("ACTIVE") || l.getStatus().equals("APPROVED"))
                .collect(Collectors.toList()).size();

        int activeCards = 0;
        for (Account acc : accounts) {
            activeCards += cardRepository.findByAccountId(acc.getId()).stream()
                    .filter(c -> c.getStatus().equals("ACTIVE"))
                    .count();
        }

        List<TransactionDTO> recentTransactions = new ArrayList<>();
        if (!accounts.isEmpty()) {
            recentTransactions = transactionRepository.findTransactionsByAccountId(accounts.get(0).getId())
                    .stream()
                    .limit(5)
                    .map(t -> TransactionDTO.builder()
                            .id(t.getId())
                            .transactionId(t.getTransactionReference())
                            .amount(t.getAmount())
                            .type(t.getTransactionType())
                            .status(t.getStatus())
                            .timestamp(t.getTransactionDate())
                            .build())
                    .collect(Collectors.toList());
        }

        String firstName = user.getFullName() != null ? user.getFullName().split(" ")[0] : "User";

        return DashboardSummaryDTO.builder()
                .userName(firstName)
                .totalBalance(totalBalance)
                .totalAccounts(accounts.size())
                .activeLoans(activeLoans)
                .activeCards(activeCards)
                .recentTransactions(recentTransactions)
                .build();
    }

    @Override
    @SuppressWarnings("null")
    public DashboardChartDTO getChartData(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Account> accounts = accountRepository.findByUserId(user.getId());

        List<String> labels = accounts.stream()
                .map(a -> a.getAccountType() + " - " + a.getAccountNumber().substring(a.getAccountNumber().length() - 4))
                .collect(Collectors.toList());

        List<BigDecimal> balances = accounts.stream()
                .map(Account::getBalance)
                .collect(Collectors.toList());

        return DashboardChartDTO.builder()
                .accountLabels(labels)
                .accountBalances(balances)
                .build();
    }
}
