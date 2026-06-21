package com.bankingsystem.service.impl;

import com.bankingsystem.dto.TransactionDTO;
import com.bankingsystem.entity.Account;
import com.bankingsystem.entity.Transaction;
import com.bankingsystem.exception.InsufficientFundsException;
import com.bankingsystem.exception.ResourceNotFoundException;
import com.bankingsystem.repository.AccountRepository;
import com.bankingsystem.repository.TransactionRepository;
import com.bankingsystem.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final com.bankingsystem.repository.UserRepository userRepository;

    @Override
    @Transactional
    public TransactionDTO deposit(Long accountId, BigDecimal amount, String description) {
        Account account = getAccountOrThrow(accountId);

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        Transaction transaction = buildTransaction(account, amount, "DEPOSIT", "SUCCESS", description, null);
        return mapToDTO(transactionRepository.save(transaction));
    }

    @Override
    @Transactional
    public TransactionDTO withdraw(Long accountId, BigDecimal amount, String description) {
        Account account = getAccountOrThrow(accountId);

        if (account.getBalance().compareTo(amount) < 0) {
            Transaction failedTx = buildTransaction(account, amount, "WITHDRAWAL", "FAILED", "Insufficient funds", null);
            transactionRepository.save(failedTx);
            throw new InsufficientFundsException("Insufficient funds for withdrawal.");
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        Transaction transaction = buildTransaction(account, amount, "WITHDRAWAL", "SUCCESS", description, null);
        return mapToDTO(transactionRepository.save(transaction));
    }

    @Override
    @Transactional
    public TransactionDTO transfer(Long sourceAccountId, Long targetAccountId, BigDecimal amount, String description) {
        Account sourceAccount = getAccountOrThrow(sourceAccountId);
        Account targetAccount = getAccountOrThrow(targetAccountId);

        if (sourceAccount.getBalance().compareTo(amount) < 0) {
            Transaction failedTx = buildTransaction(sourceAccount, amount, "TRANSFER", "FAILED", "Insufficient funds for transfer", targetAccount);
            transactionRepository.save(failedTx);
            throw new InsufficientFundsException("Insufficient funds for transfer.");
        }

        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));
        targetAccount.setBalance(targetAccount.getBalance().add(amount));

        accountRepository.save(sourceAccount);
        accountRepository.save(targetAccount);

        Transaction sourceTx = buildTransaction(sourceAccount, amount, "TRANSFER_OUT", "SUCCESS", description, targetAccount);
        transactionRepository.save(sourceTx);

        Transaction targetTx = buildTransaction(targetAccount, amount, "TRANSFER_IN", "SUCCESS", description, sourceAccount);
        transactionRepository.save(targetTx);

        return mapToDTO(sourceTx);
    }

    @Override
    public List<TransactionDTO> getTransactionsByAccountId(Long accountId) {
        return transactionRepository.findTransactionsByAccountId(accountId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getTransactionsByUser(String email) {
        com.bankingsystem.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<Account> accounts = accountRepository.findByUserId(user.getId());
        List<TransactionDTO> allTransactions = new java.util.ArrayList<>();
        for (Account acc : accounts) {
            allTransactions.addAll(getTransactionsByAccountId(acc.getId()));
        }
        return allTransactions;
    }

    @Override
    public TransactionDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        return mapToDTO(transaction);
    }

    private Account getAccountOrThrow(Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + accountId));
    }

    private Transaction buildTransaction(Account account, BigDecimal amount, String type, String status, String description, Account targetAccount) {
        return Transaction.builder()
                .transactionReference("TXN" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 8))
                .sourceAccount(account)
                .amount(amount)
                .transactionType(type)
                .status(status)
                .description(description)
                .destinationAccount(targetAccount)
                .transactionDate(LocalDateTime.now())
                .build();
    }

    private TransactionDTO mapToDTO(Transaction transaction) {
        return TransactionDTO.builder()
                .id(transaction.getId())
                .transactionId(transaction.getTransactionReference())
                .referenceNumber(transaction.getTransactionReference())
                .accountId(transaction.getSourceAccount() != null ? transaction.getSourceAccount().getId() : null)
                .amount(transaction.getAmount())
                .type(transaction.getTransactionType())
                .status(transaction.getStatus())
                .description(transaction.getDescription())
                .targetAccountId(transaction.getDestinationAccount() != null ? transaction.getDestinationAccount().getId() : null)
                .timestamp(transaction.getTransactionDate())
                .build();
    }
}
