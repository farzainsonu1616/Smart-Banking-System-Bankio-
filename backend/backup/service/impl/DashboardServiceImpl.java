package com.bankingsystem.service.impl;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.*;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.*;
import com.bankingsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired private UserRepository userRepository;
    @Autowired private AccountRepository accountRepository;
    @Autowired private TransactionRepository transactionRepository;
    @Autowired private LoanRepository loanRepository;
    @Autowired private CardRepository cardRepository;

    @Override
    public DashboardResponse getSummary(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Account> accounts = accountRepository.findByUserId(user.getId());
        BigDecimal totalBalance = accounts.stream()
                .map(Account::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Loan> loans = loanRepository.findByUserId(user.getId());
        long activeLoans = loans.stream()
                .filter(l -> l.getStatus() == Loan.LoanStatus.ACTIVE || l.getStatus() == Loan.LoanStatus.APPROVED)
                .count();
        BigDecimal totalLoanAmount = loans.stream().map(Loan::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalLoanPaid = loans.stream().map(Loan::getAmountPaid).reduce(BigDecimal.ZERO, BigDecimal::add);

        long activeCards = cardRepository.countByUserIdAndStatus(user.getId(), Card.CardStatus.ACTIVE);
        long totalTransactions = transactionRepository.countByFromAccountUserIdOrToAccountUserId(user.getId(), user.getId());

        List<TransactionResponse> recentTxns = transactionRepository.findRecentByUserId(user.getId())
                .stream().map(this::mapTxnToResponse).collect(Collectors.toList());

        List<AccountResponse> accountResponses = accounts.stream().map(this::mapAccToResponse).collect(Collectors.toList());

        return DashboardResponse.builder()
                .userName(user.getFirstName() + " " + user.getLastName())
                .totalBalance(totalBalance)
                .totalAccounts(accounts.size())
                .totalTransactions((int) totalTransactions)
                .activeLoans((int) activeLoans)
                .activeCards((int) activeCards)
                .totalLoanAmount(totalLoanAmount)
                .totalLoanPaid(totalLoanPaid)
                .recentTransactions(recentTxns)
                .accounts(accountResponses)
                .build();
    }

    @Override
    public Map<String, Object> getChartData(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Account> accounts = accountRepository.findByUserId(user.getId());

        Map<String, Object> chartData = new HashMap<>();
        chartData.put("accountLabels", accounts.stream().map(a -> a.getAccountType().name()).collect(Collectors.toList()));
        chartData.put("accountBalances", accounts.stream().map(Account::getBalance).collect(Collectors.toList()));

        List<Loan> loans = loanRepository.findByUserId(user.getId());
        chartData.put("loanLabels", loans.stream().map(l -> l.getLoanType().name()).collect(Collectors.toList()));
        chartData.put("loanAmounts", loans.stream().map(Loan::getAmount).collect(Collectors.toList()));

        return chartData;
    }

    private TransactionResponse mapTxnToResponse(Transaction txn) {
        return TransactionResponse.builder()
                .id(txn.getId())
                .fromAccountNumber(txn.getFromAccount() != null ? txn.getFromAccount().getAccountNumber() : null)
                .toAccountNumber(txn.getToAccount() != null ? txn.getToAccount().getAccountNumber() : null)
                .type(txn.getType().name())
                .amount(txn.getAmount())
                .balanceAfter(txn.getBalanceAfter())
                .description(txn.getDescription())
                .referenceNumber(txn.getReferenceNumber())
                .status(txn.getStatus().name())
                .transactionDate(txn.getTransactionDate())
                .build();
    }

    private AccountResponse mapAccToResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .accountType(account.getAccountType().name())
                .balance(account.getBalance())
                .currency(account.getCurrency())
                .status(account.getStatus().name())
                .ownerName(account.getUser().getFirstName() + " " + account.getUser().getLastName())
                .createdAt(account.getCreatedAt())
                .build();
    }
}
