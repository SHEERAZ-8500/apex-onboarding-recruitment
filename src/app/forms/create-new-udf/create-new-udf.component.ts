import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-udf',
  templateUrl: './create-new-udf.component.html',
  styleUrls: ['./create-new-udf.component.scss']
})
export class CreateNewUdfComponent implements OnInit {
  // Form Code from URL
  formCode: string = '';

  // Form Fields
  entityName: string = '';
  fieldCode: string = '';
  label: string = '';
  fieldType: string = '';
  nullable: boolean = false;
  unique: boolean = false;
  maxLength: number | null = null;
  validationRegex: string = '';
  displayOrder: number | null = null;

  // Dropdown State
  isFieldTypeDropdownOpen: boolean = false;
  selectedFieldType: string = '';

  // Field Type Options
  fieldTypes: string[] = [
    'STRING',
    'NUMBER',
    'DATE',
    'BOOLEAN',
    'EMAIL',
    'PHONE',
    'URL',
    'TEXTAREA'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private loader: LoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get formCode from URL query params
    this.route.queryParams.subscribe(params => {
      this.formCode = params['formCode'] || '';
    });
  }

  // Field Type Dropdown
  toggleFieldTypeDropdown(event: Event): void {
    event.stopPropagation();
    this.isFieldTypeDropdownOpen = !this.isFieldTypeDropdownOpen;
  }

  selectFieldType(type: string, event: Event): void {
    event.stopPropagation();
    this.selectedFieldType = type;
    this.fieldType = type;
    this.isFieldTypeDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    this.isFieldTypeDropdownOpen = false;
  }

  // Submit Form
  onSubmit(): void {
    // Validation
    if (!this.entityName || !this.fieldCode || !this.label || !this.fieldType || !this.displayOrder) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    const payload = {
      formCode: this.formCode,
      entityName: this.entityName,
      fieldCode: this.fieldCode,
      label: this.label,
      fieldType: this.fieldType,
      nullable: this.nullable,
      unique: this.unique,
      maxLength: this.maxLength,
      validationRegex: this.validationRegex || null,
      displayOrder: this.displayOrder
    };

    this.loader.show();

    // this.apiService.createNewUDF(payload).subscribe({
    //   next: (response: any) => {
    //     this.loader.hide();
    //     this.toastr.success('UDF field created successfully');
    //     this.resetForm();
    //   },
    //   error: (error: any) => {
    //     this.loader.hide();
    //     this.toastr.error(error?.error?.message || 'Failed to create UDF field');
    //   }
    // });
  }

  // Cancel
  onCancel(): void {
    this.resetForm();
  }

  // Reset Form
  resetForm(): void {
    this.entityName = '';
    this.fieldCode = '';
    this.label = '';
    this.fieldType = '';
    this.selectedFieldType = '';
    this.nullable = false;
    this.unique = false;
    this.maxLength = null;
    this.validationRegex = '';
    this.displayOrder = null;
  }
}
