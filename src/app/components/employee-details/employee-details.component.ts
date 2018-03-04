import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Employee } from '../../model/Employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
id:string;
employee:Employee;
hasBalance:boolean=false;
showBalanceUpdateInput:boolean=false;
  constructor(
     public employeeService: EmployeeService,
     public router: Router,
     public route:ActivatedRoute,
     public flashMessagesService: FlashMessagesService

  ) { }

  ngOnInit() {
      
    //id
    this.id=this.route.snapshot.params['id'];
    

    console.log(this.id);
    //get client
    this.employeeService.getEmployee(this.id).subscribe(employee=>{
      if(employee.balance>0){
        this.hasBalance=true;
      }
      this.employee=employee;
      console.log(this.employee);
    });

  }
   updateBalance(id:string){
        this.employeeService.updateEmployee(this.id,this.employee);
        this.flashMessagesService.show('Balance Updated!!',
        {cssClass:'alert-success', timeout: 5000});
       this.router.navigate(['/employees/'+ this.id]);
   }

   onDelete(){
     if(confirm("Are you sure to Delete?")){
      this.employeeService.deleteEmployee(this.id);
      this.flashMessagesService.show('Employee Deleted!!',
      {cssClass:'alert-success', timeout: 5000});
     this.router.navigate(['/']);
     }
   }
}
