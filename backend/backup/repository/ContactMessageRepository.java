package com.bankingsystem.repository;

import com.bankingsystem.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByIsReadFalse();
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
}
