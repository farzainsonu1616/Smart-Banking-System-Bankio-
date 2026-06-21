package com.bankingsystem.service.impl;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.*;
import com.bankingsystem.exception.*;
import com.bankingsystem.repository.*;
import com.bankingsystem.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@SuppressWarnings("null")
public class TransactionServiceImpl implements TransactionService {

    @Autowired private TransactionRepository transactionRepository;
    @Autowired private AccountRepository accountRepository;
    @Autowired private UserRepository userRepository;

    @Override
    public TransactionResponse deposit(String email, TransactionRequest request) {
        Account account = getAccountAndValidateOwnership(email, request.getToAccountId());

        account.setBalance(account.getBalance().add(request.getAmount()));
        accountRepository.save(account);

        Transaction txn = Transaction.builder()
                .toAccount(account)
                .type(Transaction.TransactionType.DEPOSIT)
                .amount(request.getAmount())
                .balanceAfter(account.getBalance())
                .description(request.getDescription() != null ? request.getDescription() : "Cash Deposit")
                .referenceNumber(generateReferenceNumber())
                .status(Transaction.TransactionStatus.COMPLETED)
                .transactionDate(LocalDateTime.now())
                .build();

        transactionRepository.save(txn);
        return mapToResponse(txn);
    }

    @Override
    public TransactionResponse withdraw(String email, TransactionRequest request) {
        Account account = getAccountAndValidateOwnership(email, request.getFromAccountId());

        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientFundsException("Insufficient balance. Available: " + account.getBalance());
        }

        account.setBalance(account.getBalance().subtract(request.getAmount()));
        accountRepository.save(account);

        Transaction txn = Transaction.builder()
                .fromAccount(account)
                .type(Transaction.TransactionType.WITHDRAWAL)
                .amount(request.getAmount())
                .balanceAfter(account.getBalance())
                .description(request.getDescription() != null ? request.getDescription() : "Cash Withdrawal")
                .referenceNumber(generateReferenceNumber())
                .status(Transaction.TransactionStatus.COMPLETED)
                .transactionDate(LocalDateTime.now())
                .build();

        transactionRepository.save(txn);
        return mapToResponse(txn);
    }

    @Override
    public TransactionResponse transfer(String email, TransactionRequest request) {
        Account fromAccount = getAccountAndValidateOwnership(email, request.getFromAccountId());

        Account toAccount;
        if (request.getToAccountId() != null) {
            toAccount = accountRepository.findById(request.getToAccountId())
                    .orElseThrow(() -> new ResourceNotFoundException("Destination account not found"));
        } else if (request.getToAccountNumber() != null) {
            toAccount = accountRepository.findByAccountNumber(request.getToAccountNumber())
                    .orElseThrow(() -> new ResourceNotFoundException("Destination account not found: " + request.getToAccountNumber()));
        } else {
            throw new BadRequestException("Destination account is required");
        }

        if (fromAccount.getId().equals(toAccount.getId())) {
            throw new BadRequestException("Cannot transfer to the same account");
        }

        if (fromAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientFundsException("Insufficient balance. Available: " + fromAccount.getBalance());
        }

        fromAccount.setBalance(fromAccount.getBalance().subtract(request.getAmount()));
        toAccount.setBalance(toAccount.getBalance().add(request.getAmount()));
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        Transaction txn = Transaction.builder()
                .fromAccount(fromAccount)
                .toAccount(toAccount)
                .type(Transaction.TransactionType.TRANSFER)
                .amount(request.getAmount())
                .balanceAfter(fromAccount.getBalance())
                .description(request.getDescription() != null ? request.getDescription() : "Fund Transfer")
                .referenceNumber(generateReferenceNumber())
                .status(Transaction.TransactionStatus.COMPLETED)
                .transactionDate(LocalDateTime.now())
                .build();

        transactionRepository.save(txn);
        return mapToResponse(txn);
    }

    @Override
    public List<TransactionResponse> getTransactionHistory(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return transactionRepository.findByUserId(user.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public TransactionResponse getTransactionById(String email, Long id) {
        Transaction txn = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        return mapToResponse(txn);
    }

    @Override
    public List<TransactionResponse> getTransactionsByAccount(String email, Long accountId) {
        getAccountAndValidateOwnership(email, accountId);
        return transactionRepository.findByAccountId(accountId)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private Account getAccountAndValidateOwnership(String email, Long accountId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        if (!account.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to access this account");
        }
        return account;
    }

    private String generateReferenceNumber() {
        return "TXN" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"))
                + String.format("%03d", new Random().nextInt(999));
    }

    private TransactionResponse mapToResponse(Transaction txn) {
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
}
