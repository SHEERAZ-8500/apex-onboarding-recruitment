import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';

interface TableColumn {
  name: string;
  type: string;
  maxLength?: number;
  nullable: boolean;
  displayOrder: number | null;
  lookupComponentCode?: string;
  isTypeDropdownOpen?: boolean;
}

@Component({
  selector: 'app-create-new-row-in-table',
  templateUrl: './create-new-row-in-table.component.html',
  styleUrl: './create-new-row-in-table.component.scss'
})
export class CreateNewRowInTableComponent {
  // Form Fields
  rowTableName: string = '';
  description: string = '';
  columns: TableColumn[] = [
    {
      name: '',
      type: '',
      nullable: false,
      displayOrder: null,
      isTypeDropdownOpen: false
    }
  ];

  // Column Type Options
  columnTypes: string[] = [
    'STRING',
    'NUMBER',
    'DATE',
    'BOOLEAN',
    'EMAIL',
    'PHONE',
    'URL',
    'TEXTAREA',
    'LOOKUP_ENUM'
  ];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private loader: LoaderService,
    private toastr: ToastrService
  ) {}

  // Add new column
  addColumn(): void {
    this.columns.push({
      name: '',
      type: '',
      nullable: false,
      displayOrder: null,
      isTypeDropdownOpen: false
    });
  }

  // Remove column
  removeColumn(index: number): void {
    if (this.columns.length > 1) {
      this.columns.splice(index, 1);
    }
  }

  // TrackBy function
  trackByIndex(index: number): number {
    return index;
  }

  // Toggle Type Dropdown
  toggleTypeDropdown(index: number, event: Event): void {
    event.stopPropagation();
    this.columns[index].isTypeDropdownOpen = !this.columns[index].isTypeDropdownOpen;
  }

  // Select Column Type
  selectColumnType(index: number, type: string, event: Event): void {
    event.stopPropagation();
    this.columns[index].type = type;
    this.columns[index].isTypeDropdownOpen = false;
  }

  // Close dropdowns on document click
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.columns.forEach(col => col.isTypeDropdownOpen = false);
    }
  }

  // Submit Form
  onSubmit(): void {
    // Validation
    if (!this.rowTableName || !this.description) {
      this.toastr.error('Please fill in table name and description');
      return;
    }

    if (this.columns.length === 0) {
      this.toastr.error('Please add at least one column');
      return;
    }

    // Validate columns
    for (let i = 0; i < this.columns.length; i++) {
      const col = this.columns[i];
      if (!col.name || !col.type || col.displayOrder === null) {
        this.toastr.error(`Please fill all required fields for Column ${i + 1}`);
        return;
      }

      if (col.type === 'LOOKUP_ENUM' && !col.lookupComponentCode) {
        this.toastr.error(`Lookup Component Code is required for Column ${i + 1}`);
        return;
      }
    }

    // Build payload
    const payload: any = {
      rowTableName: this.rowTableName,
      description: this.description,
      columns: this.columns.map(col => {
        const column: any = {
          name: col.name,
          type: col.type,
          nullable: col.nullable,
          displayOrder: col.displayOrder
        };

        if (col.maxLength) {
          column.maxLength = col.maxLength;
        }

        if (col.lookupComponentCode) {
          column.lookupComponentCode = col.lookupComponentCode;
        }

        return column;
      })
    };

    console.log('Payload:', payload);

    this.loader.show();

    // Uncomment when API is ready
    this.apiService.createRowInTable(payload).subscribe({
      next: (response: any) => {
        this.loader.hide();
        this.toastr.success('Row table created successfully');
        this.resetForm();
      },
      error: (error: any) => {
        this.loader.hide();
        this.toastr.error(error?.error?.message || 'Failed to create row table');
      }
    });

    // Temporary - remove when API is ready
    setTimeout(() => {
      this.loader.hide();
      this.toastr.success('Row table created successfully');
      this.resetForm();
    }, 1000);
  }

  // Cancel
  onCancel(): void {
    this.resetForm();
    this.router.navigate(['/panel/table/table-listing']);
  }

  // Reset Form
  resetForm(): void {
    this.rowTableName = '';
    this.description = '';
    this.columns = [
      {
        name: '',
        type: '',
        nullable: false,
        displayOrder: null,
        isTypeDropdownOpen: false
      }
    ];
  }
}
