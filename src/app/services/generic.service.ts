import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { RequestResult } from "../models/RequestResult";
import { EmployeeDTO } from "../models/employeeDTO";
import { UrlApli } from "../../assets/config";

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private handleError: any;
  private urlApi = UrlApli;

  constructor(
    private http: HttpClient,
  ) { }

  getEmployee(): Observable<RequestResult<any[]>> {
    return this.http.get<RequestResult<any[]>>(`${this.urlApi}employee`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        if (response.error) return response;
        return response.body;
      }));
  };
  postEmployee(employee: EmployeeDTO): Observable<RequestResult<any[]>> {
    return this.http.post<RequestResult<any[]>>(`${this.urlApi}employee`, { employee })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        if (response.error) return response;
        return response;
      }));
  };
  updateEmployee(employee: EmployeeDTO, id: string): Observable<RequestResult<any[]>> {    
    return this.http.put<RequestResult<any[]>>(`${this.urlApi}employee?employeeid=${id}`, employee)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        if (response.error) return response;
        return response;
      }));
  };
  deleteEmployee(id: string): Observable<RequestResult<any[]>> {
    return this.http.delete<RequestResult<any[]>>(`${this.urlApi}employee?employeeid=${id}`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        if (response.error) return response;
        return response;
      }));
  };


}
