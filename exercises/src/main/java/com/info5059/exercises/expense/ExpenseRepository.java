package com.info5059.exercises.expense;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
@Repository
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "expenses", path = "expenses")
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
 // will return the number of rows deleted
 @Modifying
 @Transactional
 @Query("delete from Expense where id = ?1")
 int deleteOne(Long expenseid);
 List<Expense> findByEmployeeid(Long employeeid);
}
