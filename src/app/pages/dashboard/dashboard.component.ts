import {Component, inject, OnInit} from '@angular/core';
import {MasterService} from "../../services/master.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  dashboardData: any;
  masterSrv = inject(MasterService)

  ngOnInit(): void {
    this.masterSrv.getDashboardData().subscribe((res:any)=>{
      this.dashboardData = res
    })
  }
}
