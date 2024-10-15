import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IProject, IProjectEmployee} from "../../models/interfaces/master";
import {MasterService} from "../../services/master.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Employee} from "../../models/classses/Employee";
import {AsyncPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.scss'
})
export class ProjectEmployeeComponent implements OnInit {
  masterSrv = inject(MasterService)
  projectEmployeeList = signal<IProjectEmployee[]>([])
  form: FormGroup = new FormGroup({})
  projectList$: Observable<IProject[]> = new Observable<IProject[]>;
  empList$: Observable<Employee[]> = new Observable<Employee[]>;

  constructor() {
    this.initializeForm();
    this.projectList$ = this.masterSrv.getAllProjects();
    this.empList$ = this.masterSrv.getAllEmp()
  }

  ngOnInit(): void {
    this.getAllData()
  }

  initializeForm() {
    this.form = new FormGroup({
      empProjectId: new FormControl(0),
      projectId: new FormControl(0),
      empId: new FormControl(0),
      assignedDate: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false)
    })
  }

  getAllData() {
    this.masterSrv.getProjectEmp().subscribe((res: IProjectEmployee[]) => {
      this.projectEmployeeList.set(res)
    })
  }

  onSave(){
    const formValue = this.form.value
    this.masterSrv.saveProjectEmp(<IProjectEmployee>formValue).subscribe((res: IProjectEmployee) => {
      alert("Employee added to project")
      this.getAllData();
      this.form.reset();
    }, error => {
      alert("Error occurred while added employee")
    })
  }

}
