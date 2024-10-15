import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Employee} from "../../models/classses/Employee";
import {MasterService} from "../../services/master.service";
import {IProject} from "../../models/interfaces/master";

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder)
  masterSrv = inject(MasterService)
  empList = signal<Employee[]>([])
  activateRoute = inject(ActivatedRoute)
  projectForm! : FormGroup;

  ngOnInit() {
    this.initializeForm()

    this.masterSrv.getAllEmp().subscribe(
      employees => this.empList.set(employees)
    )

    this.activateRoute.params.subscribe((res:any)=>{
      if(res.id != 0){
        this.getProject(res.id)
      }
    })
  }

  initializeForm(data?:IProject) {
    this.projectForm = this.fb.group({
      projectId: [data ? data.projectId : 0],
      projectName: [data ? data.projectName : ''],
      clientName: [data ? data.clientName : ''],
      startDate: [data ? data.startDate : ''],
      leadByEmpId: [data ? data.leadByEmpId : ''],
      contactPerson: [data ? data.contactPerson : ''],
      contactNo: [data ? data.contactNo : ''],
      emailId: [data ? data.emailId : '']
    })
  }

  getProject(id: number) {
    this.masterSrv.getProjectById(id).subscribe((res: IProject) => {
      this.projectForm?.patchValue(res)
    }, error => {
      alert("Error occurred while get project")
    })
  }

  onSaveProject() {
    const formValue = this.projectForm.value
    this.masterSrv.saveProject(<IProject>formValue).subscribe((res: IProject) => {
      alert("Project Created")
      this.projectForm.reset()
    }, error => {
      alert("Error occurred while saved project")
    })
  }

  onUpdate(){
    const formValue = this.projectForm.value
    this.masterSrv.updateProject(<IProject>formValue).subscribe((res: IProject) => {
      alert("Project Updated")
      this.projectForm.reset()
    }, error => {
      alert("Error occurred while updated project")
    })
  }

}
