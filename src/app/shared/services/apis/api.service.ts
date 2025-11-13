import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {    
constructor(private http: HttpClient) {  }

saveFormDefinition(formDefinition: any) {
    return this.http.post('v1/forms/definitions', formDefinition);
  }
  getFormDefinition() {
    return this.http.get('v1/forms/definitions');
  }
}