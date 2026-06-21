package com.bankingsystem.repository;

import com.bankingsystem.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUserId(Long userId);
    List<Card> findByAccountId(Long accountId);
    List<Card> findByUserIdAndStatus(Long userId, Card.CardStatus status);
    long countByUserIdAndStatus(Long userId, Card.CardStatus status);
}
