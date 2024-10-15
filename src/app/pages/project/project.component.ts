import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {IProject} from '../../models/interfaces/master';
import {MasterService} from "../../services/master.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  masterSrv = inject(MasterService)
  projectList = signal<IProject[]>([])
  router = inject(Router)

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.masterSrv.getAllProjects().subscribe((res:IProject[])=>{
      this.projectList.set(res)
    })
  }

  onEdit(id: number){
    this.router.navigate(['new-project',id])
  }

  onDelete(id: number){

  }

}
