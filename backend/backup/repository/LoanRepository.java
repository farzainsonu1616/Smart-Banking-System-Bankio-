package com.bankingsystem.repository;

import com.bankingsystem.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserId(Long userId);
    List<Loan> findByStatus(Loan.LoanStatus status);
    List<Loan> findByUserIdAndStatus(Long userId, Loan.LoanStatus status);
    long countByUserId(Long userId);
    long countByUserIdAndStatusIn(Long userId, List<Loan.LoanStatus> statuses);
}
