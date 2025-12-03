import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptionService } from '../encryption.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient, private encryptionService: EncryptionService) { }


  // auth apis 
  logIn(userCredentials: any) {
    let devicefromStorage = localStorage.getItem('deviceId') || '';
    let deviceId = '';
    if (devicefromStorage) {
      deviceId = this.encryptionService.decrypt(devicefromStorage);
    }

    const headers = new HttpHeaders({
      'X-Device-Id': deviceId || ''
    });
    return this.http.post('auth/login', userCredentials, { headers });
  }
  refreshToken(refreshToken: any) {
    return this.http.post('auth/refresh', { refreshToken });
  }
  verifyOtp(otp: any) {
    return this.http.post('auth/otp/verify', otp, { observe: 'response' });
  }
  resendOtp(preAuthToken: any) {
    return this.http.post('auth/otp/resend', { preAuthToken });
  }
  verifyInvitMemberAddNewPassword(data: any) {
    return this.http.post('auth/invite/complete', data);
  }

  resetPasswordByEmail(data: any) {
    return this.http.post('auth/password/forgot', data);
  }
  createNewPassword(data: any) {
    return this.http.post('auth/password/reset', data);
  }







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

  saveUserFormData(formDefinitionPublicId: any, userFormData: any) {
    return this.http.post(`v1/forms/submissions/${formDefinitionPublicId}`, userFormData);
  }
  getUserFormData(publicId: any) {
    return this.http.get(`v1/forms/submissions/${publicId}`);
  }
  updateUserFormData(publicId: any, userFormData: any) {
    return this.http.put(`v1/forms/submissions/${publicId}`, userFormData);
  }
  getAllFormSubmissionsById(formDefinitionPublicId: string) {
    return this.http.get(`v1/forms/submissions`, {
      params: { formDefinitionPublicId: formDefinitionPublicId }
    });
  }
  getAllTables(companyId: any) {
    return this.http.get(`v1/md/tables`,
      //   {
      //   params: { companyId: companyId }
      // }
    );
  }
  createTable(tableSchema: any) {
    return this.http.post(`v1/md/tables`, tableSchema);
  }
}