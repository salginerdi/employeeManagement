import {Component, inject, OnInit, signal} from '@angular/core';
import {MasterService} from "../../services/master.service";
import {IApiResponse, IChildDept, IParentDept} from "../../models/interfaces/master";
import {FormsModule} from "@angular/forms";
import {Employee} from "../../models/classses/Employee";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  isFormVisible = signal<boolean>(false)
  masterSrv = inject(MasterService)
  parentDeptList = signal<IParentDept[]>([])
  employeeList = signal<Employee[]>([])
  childDeptList = signal<IChildDept[]>([])
  parentDeptId: number = 0;
  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getParentDept();
    this.getEmployees();
  }

  getParentDept() {
    this.masterSrv.getAllDept().subscribe((res: IApiResponse) => {
      this.parentDeptList.set(res.data)
    })
  }

  getEmployees() {
    this.masterSrv.getAllEmp().subscribe((res: Employee[]) => {
      this.employeeList.set(res)
    })
  }

  onParentDeptChange() {
    this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((res: IApiResponse) => {
      this.childDeptList.set(res.data)
    })
  }

  onSave() {
    this.masterSrv.saveEmp(this.employeeObj).subscribe((res: IApiResponse) => {
      alert("Employee Created")
      this.getEmployees()
      this.employeeObj = new Employee()
    }, error => {
      alert("Error occurred while saving employee")
    })
  }

  onEdit(data: Employee) {
    this.employeeObj = data;
    this.isFormVisible.set(true);
  }

  onUpdate() {
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res: IApiResponse) => {
      alert("Employee Updated")
      this.getEmployees()
      this.employeeObj = new Employee()
    }, error => {
      alert("Error occurred while updating employee")
    })
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure want to delete?")
    if (isDelete) {
      this.masterSrv.deleteEmpById(id).subscribe((res: IApiResponse) => {
        alert("Employee Deleted")
        this.getEmployees()
      }, error => {
        alert("Error occurred while deleting employee")
      })
    }
  }
}
