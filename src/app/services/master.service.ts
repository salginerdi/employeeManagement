import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IApiResponse, IProject, IProjectEmployee} from "../models/interfaces/master";
import {Employee} from "../models/classses/Employee";

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http = inject(HttpClient)
  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/'

  constructor() {
  }

  getAllDept(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.apiUrl + 'GetParentDepartment');
  }

  getChildDeptById(deptid: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptid}`);
  }

  saveEmp(obj: Employee): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.apiUrl + 'CreateEmployee', obj);
  }

  getAllEmp(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'GetAllEmployees');
  }

  updateEmp(obj: Employee): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(this.apiUrl + 'UpdateEmployee/' + obj.employeeId, obj);
  }

  deleteEmpById(id: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(this.apiUrl + 'DeleteEmployee/' + id);
  }

  saveProject(obj: IProject): Observable<IProject> {
    return this.http.post<IProject>(this.apiUrl + 'CreateProject', obj);
  }

  updateProject(obj: IProject): Observable<IProject> {
    return this.http.put<IProject>(this.apiUrl + 'UpdateProject/' + obj.projectId, obj);
  }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl + 'GetAllProjects');
  }

  getProjectById(id:number): Observable<IProject> {
    return this.http.get<IProject>(this.apiUrl + '/GetProject/' + id);
  }

  getProjectEmp(): Observable<IProjectEmployee[]> {
    return this.http.get<IProjectEmployee[]>(this.apiUrl + 'GetAllProjectEmployees');
  }

  saveProjectEmp(obj: IProjectEmployee): Observable<IProjectEmployee> {
    return this.http.post<IProjectEmployee>(this.apiUrl + 'CreateProjectEmployee', obj);
  }

  updateProjectEmp(obj: IProjectEmployee): Observable<IProjectEmployee> {
    return this.http.put<IProjectEmployee>(this.apiUrl + 'UpdateProjectEmployee/' + obj.empProjectId, obj);
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'GetAllDashboard');
  }

}
