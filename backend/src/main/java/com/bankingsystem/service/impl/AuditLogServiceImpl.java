package com.bankingsystem.service.impl;

import com.bankingsystem.entity.AuditLog;
import com.bankingsystem.repository.AuditLogRepository;
import com.bankingsystem.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Override
    @Transactional
    public void logAction(String username, String action, String details, String ipAddress) {
        AuditLog log = AuditLog.builder()
                .username(username)
                .action(action)
                .details(details)
                .ipAddress(ipAddress)
                .build();
        auditLogRepository.save(log);
    }

    @Override
    public List<AuditLog> getLogsByUsername(String username) {
        return auditLogRepository.findByUsername(username);
    }

    @Override
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }
}
