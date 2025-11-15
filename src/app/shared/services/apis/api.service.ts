import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  saveFormDefinition(formDefinition: any) {
    return this.http.post('v1/forms/definitions', formDefinition);
  }
  getFormAllDefinition() {
    return this.http.get(`v1/forms/definitions`);
  }
  getFormDefinitionById(id: any) {
    return this.http.get(`v1/forms/definitions/${id}`);
  }
  updateFormDefinitionById(id: any, formDefinition: any) {
    return this.http.put(`v1/forms/definitions/${id}`, formDefinition);
  }
  logIn(userCredentials: any) {
    return this.http.post('auth/login', userCredentials);
  }
  refreshToken(refreshToken: any) {
    return this.http.post('auth/refresh', { refreshToken });
  }
  saveUserFormData(formDefinitionPublicId: any, userFormData: any) {
    return this.http.post(`v1/forms/submissions/${formDefinitionPublicId}`, userFormData);
  }
  getUserFormData(publicId: any) {
    return this.http.get(`v1/forms/submissions/${publicId}`);
  }
  getAllFormSubmissionsById(formDefinitionPublicId: string) {
    return this.http.get(`v1/forms/submissions`, {
      params: { formDefinitionPublicId: formDefinitionPublicId }
    });
  }
}