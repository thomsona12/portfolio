package com.info5059.casestudy.purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
public class PurchaseOrderController {
 @Autowired
 private PurchaseOrderDAO purchaseOrderDAO;
 @Autowired
 private PurchaseOrderRepository poRepository;
 @PostMapping("/api/purchaseOrders")
 public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder clientrep) { // use RequestBody here
 return new ResponseEntity<PurchaseOrder>(purchaseOrderDAO.create(clientrep), HttpStatus.OK);
 }
 @GetMapping("/api/purchaseOrders")
public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
 Iterable<PurchaseOrder> pos = poRepository.findAll();
 return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
}
@GetMapping("/api/purchaseOrders/{id}")
public ResponseEntity<Iterable<PurchaseOrder>> findByVendor(@PathVariable Long id) {
return new ResponseEntity<Iterable<PurchaseOrder>>(poRepository.findByVendorid(id), HttpStatus.OK);
}
}