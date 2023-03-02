package com.info5059.exercises.report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
public class ReportController {
 @Autowired
 private ReportDAO reportDAO;
 @Autowired
 private ReportRepository reportRepository;
 @PostMapping("/api/reports")
 public ResponseEntity<Report> addOne(@RequestBody Report clientrep) { // use RequestBody here
 return new ResponseEntity<Report>(reportDAO.create(clientrep), HttpStatus.OK);
 }
 @GetMapping("/api/reports/{id}")
public ResponseEntity<Iterable<Report>> findByEmployee(@PathVariable Long id) {
return new ResponseEntity<Iterable<Report>>(reportRepository.findByEmployeeid(id), HttpStatus.OK);
}
@GetMapping("/api/reports")
 public ResponseEntity<Iterable<Report>> findAll() {
 Iterable<Report> reports = reportRepository.findAll();
 return new ResponseEntity<Iterable<Report>>(reports, HttpStatus.OK);
 }
}