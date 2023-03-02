package com.info5059.casestudy.product;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
/**
* Product entity
*/
@Entity
@Data
@RequiredArgsConstructor
public class Product {
 @Id
 private String Id;
 private int vendorid; // FK
 private String name;
 private BigDecimal costprice;
 private BigDecimal msrp;
 private int rop;
 private int eoq;
 private int qoh;
 private int qoo;
 @Basic(optional = true)
 @Lob
 private byte[] qrcode;
 @Basic(optional = true)
 private String qrcodetxt;
 // needed in 2nd case study
 @Basic(optional = true)
 @Lob
 private String receiptscan;
}
