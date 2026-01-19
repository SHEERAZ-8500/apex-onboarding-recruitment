import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/apis/api.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-lookup-table',
  templateUrl: './create-lookup-table.component.html',
  styleUrl: './create-lookup-table.component.scss'
})
export class CreateLookupTableComponent {
  // Form Fields
  lookupName: string = '';
  description: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private loader: LoaderService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  // Submit Form
  onSubmit(): void {
    // Validation
    if (!this.lookupName || !this.description) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    const payload = {
      lookupName: this.lookupName,
      description: this.description
    };

    console.log('Payload:', payload);

    this.loader.show();

    // Uncomment when API is ready
    this.apiService.createLookUpTable(payload).subscribe({
      next: (response: any) => {
        this.loader.hide();
        this.toastr.success('Lookup table created successfully');
        this.resetForm();
      },
      error: (error: any) => {
        this.loader.hide();
        this.toastr.error(error?.error?.message || 'Failed to create lookup table');
      }
    });

    // Temporary - remove when API is ready
    setTimeout(() => {
      this.loader.hide();
      this.toastr.success('Lookup table created successfully');
      this.resetForm();
    }, 1000);
  }

  // Cancel
  onCancel(): void {
    this.resetForm();
    this.location.back();
  }

  // Reset Form
  resetForm(): void {
    this.lookupName = '';
    this.description = '';
  }
}
