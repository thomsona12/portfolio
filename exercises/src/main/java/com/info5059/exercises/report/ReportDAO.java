package com.info5059.exercises.report;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
@Component
public class ReportDAO {
 @PersistenceContext
 private EntityManager entityManager;
 @Transactional
 public Report create(Report clientrep) {
 Report realReport = new Report();
 realReport.setDatecreated(LocalDateTime.now());
 realReport.setEmployeeid(clientrep.getEmployeeid());
 entityManager.persist(realReport);
 for (ReportItem item : clientrep.getItems()) {
 ReportItem realItem = new ReportItem();
 realItem.setReportid(realReport.getId());
 realItem.setExpenseid(item.getExpenseid());
 entityManager.persist(realItem);
 }
 entityManager.refresh(realReport);
 return realReport;
 }
}