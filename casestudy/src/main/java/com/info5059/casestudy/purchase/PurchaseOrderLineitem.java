package com.info5059.casestudy.purchase;
import java.math.BigDecimal;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class PurchaseOrderLineitem {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private Long poid;
 private String productid;
 private int qty;
 private BigDecimal price;

}
