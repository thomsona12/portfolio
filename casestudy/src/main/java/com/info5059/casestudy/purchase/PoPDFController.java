package com.info5059.casestudy.purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.info5059.casestudy.vendor.VendorRepository;
import com.info5059.casestudy.product.ProductRepository;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
@CrossOrigin
@RestController
public class PoPDFController {
 @Autowired
 private VendorRepository vendorRepository;
 @Autowired
 private ProductRepository productRepository;
 @Autowired
 private PurchaseOrderRepository reportRepository;

 @RequestMapping(value = "/PurchaseOrderPDF", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
 public ResponseEntity<InputStreamResource> streamPDF(HttpServletRequest request) throws IOException {
 // get formatted pdf as a stream
 String repid = request.getParameter("repid");
 ByteArrayInputStream bis = PoPDFGenerator.generatePurchaseOrder(repid,
 reportRepository,
vendorRepository,
productRepository);
 HttpHeaders headers = new HttpHeaders();
 headers.add("Content-Disposition", "inline; filename=examplereport.pdf");
 // dump stream to browser
 return ResponseEntity
 .ok()
 .headers(headers)
 .contentType(MediaType.APPLICATION_PDF)
 .body(new InputStreamResource(bis));
 }
}
