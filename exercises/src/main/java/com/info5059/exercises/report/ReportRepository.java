package com.info5059.exercises.report;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
@Repository
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "reports", path = "reports")
public interface ReportRepository extends CrudRepository<Report, Long> {
// extend so we can return the number of rows deleted
@Modifying
@Transactional
@Query("delete from Report where id = ?1")
int deleteOne(Long reportid);
List<Report> findByEmployeeid(Long employeeid);
}

