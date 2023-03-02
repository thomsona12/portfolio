package com.info5059.exercises.report;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.RequiredArgsConstructor;
@Entity
@Data
@RequiredArgsConstructor
public class ReportItem {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private long id;
 private long expenseid;
 private long reportid;
public long getExpenseid() {
    return expenseid;
}
public void setReportid(long id2) {
    reportid=id2;
}
public void setExpenseid(long expenseid2) {
    expenseid=expenseid2;
}

}
