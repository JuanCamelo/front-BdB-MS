import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EmployeeDTO } from 'src/app/models/employeeDTO';
import { GenericService } from "../../services/generic.service";
import { Change } from "../../models/Change";
import notify from "devextreme/ui/notify"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  employees: any;
  changes: Change<EmployeeDTO>[] = [];
  editRowKey?: any;
  isLoading = false;
  loadPanelPosition = { of: '#gridContainer' };

  constructor(private service: GenericService) {
  }
  getEmployees() {
    this.service.getEmployee().subscribe(response => {
      this.isLoading = false;
      if (response.error) return notify(response);
      this.employees = response;
    })
  };
  onSaving(e: any) {
    const employee: EmployeeDTO = e.changes[0].data;
    const change = e.changes[0];
    const valid = e.changes[0].type;
    switch (valid) {
      case "insert":
        e.cancel = true;
        this.service.postEmployee(employee).subscribe(response => {
          notify(response.details);
          this.editRowKey = null;
          this.isLoading = false;
          this.getEmployees();
        });
        break;
      case "update":
        e.cancel = true;
        const Idemployee = e.changes[0].key;
        this.service.updateEmployee(employee, Idemployee).subscribe(response => {
          notify(response.details);
          this.editRowKey = null;
          this.isLoading = false;
          this.getEmployees();
        });
        break;
      case "remove":
        const Id = e.changes[0].key;
        this.service.deleteEmployee(Id).subscribe(response => {
          notify(response.details);
          this.isLoading = false;
          this.getEmployees();
        });
        break;
    }
      
  };

  ngOnInit() {
    this.getEmployees();
    this.isLoading = true;
  };
}

