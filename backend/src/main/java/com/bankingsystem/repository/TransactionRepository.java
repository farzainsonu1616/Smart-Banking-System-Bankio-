package com.bankingsystem.repository;

import com.bankingsystem.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @org.springframework.data.jpa.repository.Query("SELECT t FROM Transaction t WHERE t.sourceAccount.id = :accountId OR t.destinationAccount.id = :accountId ORDER BY t.transactionDate DESC")
    List<Transaction> findTransactionsByAccountId(@org.springframework.data.repository.query.Param("accountId") Long accountId);

    List<Transaction> findByTransactionReference(String transactionReference);
}
