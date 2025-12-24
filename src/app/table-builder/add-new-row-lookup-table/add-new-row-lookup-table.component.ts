import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-new-row-lookup-table',
  templateUrl: './add-new-row-lookup-table.component.html',
  styleUrl: './add-new-row-lookup-table.component.scss'
})
export class AddNewRowLookupTableComponent implements OnInit {
  // Component Code from URL
  componentCode: string = '';

  // Form Fields
  code: string = '';
  name: string = '';
  description: string = '';
  isActive: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private loader: LoaderService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get componentCode from URL query params
    this.route.queryParams.subscribe(params => {
      this.componentCode = params['tableName'] || '';
    });
  }

  // Submit Form
  onSubmit(): void {
    // Validation
    if (!this.code || !this.name || !this.description) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    const payload = {
      code: this.code,
      name: this.name,
      description: this.description,
      isActive: this.isActive
    };

    console.log('Payload:', payload);

    this.loader.show();

    // Uncomment when API is ready
    this.apiService.createRowInLookUpTable(this.componentCode, payload).subscribe({
      next: (response: any) => {
        this.loader.hide();
        this.toastr.success('Row added successfully');
        this.resetForm();
      },
      error: (error: any) => {
        this.loader.hide();
        this.toastr.error(error?.error?.message || 'Failed to add row');
      }
    });

    // Temporary - remove when API is ready
    setTimeout(() => {
      this.loader.hide();
      this.toastr.success('Row added successfully');
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
    this.code = '';
    this.name = '';
    this.description = '';
    this.isActive = true;
  }
}
