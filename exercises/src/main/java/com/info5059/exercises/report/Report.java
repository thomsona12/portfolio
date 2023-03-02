package com.info5059.exercises.report;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonFormat;
@Entity
@Data
@RequiredArgsConstructor
public class Report {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
// FK
private long employeeid;
@OneToMany(mappedBy = "reportid", fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST,
CascadeType.MERGE })
private Set<ReportItem> items = new HashSet<>();
@JsonFormat(pattern="yyyy-MM-dd@HH:mm:ss")
private LocalDateTime datecreated;
public void setDatecreated(LocalDateTime now) {
    datecreated=now;
}
public long getEmployeeid() {
    return employeeid;
}
public void setEmployeeid(long employeeid2) {
    employeeid=employeeid2;
}
public Set<ReportItem> getItems() {
    return items;
}
public long getId() {
    return id;
}

}
