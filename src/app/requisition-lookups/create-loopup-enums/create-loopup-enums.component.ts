import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-loopup-enums',
  templateUrl: './create-loopup-enums.component.html',
  styleUrl: './create-loopup-enums.component.scss'
})
export class CreateLoopupEnumsComponent {
  // Form Fields
  enumName: string = '';
  description: string = '';
  values: string[] = [''];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private loader: LoaderService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  // Add new value field
  addValue(): void {
    this.values.push('');
  }

  // Remove value field
  removeValue(index: number): void {
    if (this.values.length > 1) {
      this.values.splice(index, 1);
    }
  }

  // TrackBy function to prevent re-rendering
  trackByIndex(index: number): number {
    return index;
  }

  // Submit Form
  onSubmit(): void {
    // Validation
    if (!this.enumName || !this.description) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    // Filter out empty values
    const filteredValues = this.values.filter(v => v.trim() !== '');
    
    if (filteredValues.length === 0) {
      this.toastr.error('Please add at least one enum value');
      return;
    }

    const payload = {
      enumName: this.enumName,
      description: this.description,
      values: filteredValues
    };

    console.log('Payload:', payload);

    this.loader.show();

    // Uncomment when API is ready
    this.apiService.createLookupEnum(payload).subscribe({
      next: (response: any) => {
        this.loader.hide();
        this.toastr.success('Lookup enum created successfully');
        this.resetForm();
      },
      error: (error: any) => {
        this.loader.hide();
        this.toastr.error(error?.error?.message || 'Failed to create lookup enum');
      }
    });

    // Temporary - remove when API is ready
    setTimeout(() => {
      this.loader.hide();
      this.toastr.success('Lookup enum created successfully');
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
    this.enumName = '';
    this.description = '';
    this.values = [''];
  }
}
