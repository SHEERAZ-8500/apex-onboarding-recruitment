import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/apis/api.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';

interface TableColumn {
  name: string;
  type: string;
  maxLength?: number;
  precision?: number;
  scale?: number;
  lookupComponentCode?: string;
  nullable: boolean;
  displayOrder: number | null;
  isTypeDropdownOpen?: boolean;
}

@Component({
  selector: 'app-create-new-independent-table',
  templateUrl: './create-new-independent-table.component.html',
  styleUrl: './create-new-independent-table.component.scss'
})
export class CreateNewIndependentTableComponent implements OnInit {
  // Table Fields
  rowTableName: string = '';
  description: string = '';
  
  // Columns Array
  columns: TableColumn[] = [
    {
      name: '',
      type: '',
      maxLength: undefined,
      precision: undefined,
      scale: undefined,
      lookupComponentCode: '',
      nullable: false,
      displayOrder: null,
      isTypeDropdownOpen: false
    }
  ];

  // Column Types
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
  ) { }

  ngOnInit(): void { }

  // Replace spaces with underscores in table name
  onTableNameInput(): void {
    this.rowTableName = this.rowTableName.replace(/\s+/g, '_');
  }

  // Replace spaces with underscores in column name
  onColumnNameInput(index: number): void {
    this.columns[index].name = this.columns[index].name.replace(/\s+/g, '_');
  }

  // Add new column
  addColumn(): void {
    this.columns.push({
      name: '',
      type: '',
      maxLength: undefined,
      precision: undefined,
      scale: undefined,
      lookupComponentCode: '',
      nullable: false,
      displayOrder: null,
      isTypeDropdownOpen: false
    });
  }

  // Remove column
  removeColumn(index: number): void {
    if (this.columns.length > 1) {
      this.columns.splice(index, 1);
    } else {
      this.toastr.warning('At least one column is required');
    }
  }

  // Toggle column type dropdown
  toggleColumnTypeDropdown(index: number, event: Event): void {
    event.stopPropagation();
    // Close all other dropdowns
    this.columns.forEach((col, i) => {
      if (i !== index) {
        col.isTypeDropdownOpen = false;
      }
    });
    this.columns[index].isTypeDropdownOpen = !this.columns[index].isTypeDropdownOpen;
  }

  // Select column type
  selectColumnType(index: number, type: string, event: Event): void {
    event.stopPropagation();
    this.columns[index].type = type;
    this.columns[index].isTypeDropdownOpen = false;
    
    // Reset conditional fields based on type
    if (type !== 'STRING' && type !== 'TEXTAREA') {
      this.columns[index].maxLength = undefined;
    }
    if (type !== 'NUMBER') {
      this.columns[index].precision = undefined;
      this.columns[index].scale = undefined;
    }
    if (type !== 'LOOKUP_ENUM') {
      this.columns[index].lookupComponentCode = '';
    }
  }

  // Close dropdowns on document click
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.columns.forEach(col => col.isTypeDropdownOpen = false);
    }
  }

  // Track by index for ngFor
  trackByIndex(index: number): number {
    return index;
  }

  // Submit Form
  onSubmit(): void {
    // Validation
    if (!this.rowTableName || !this.description) {
      this.toastr.error('Please fill in table name and description');
      return;
    }

    // Validate columns
    for (let i = 0; i < this.columns.length; i++) {
      const col = this.columns[i];
      if (!col.name || !col.type || col.displayOrder === null) {
        this.toastr.error(`Please fill in all required fields for column ${i + 1}`);
        return;
      }
    }

    // Prepare payload
    const payload = {
      rowTableName: this.rowTableName,
      description: this.description,
      columns: this.columns.map(col => ({
        name: col.name,
        type: col.type,
        maxLength: col.maxLength || 0,
        precision: col.precision || 0,
        scale: col.scale || 0,
        lookupComponentCode: col.lookupComponentCode || 'string',
        nullable: col.nullable,
        displayOrder: col.displayOrder
      }))
    };

    console.log('Payload:', payload);

    this.loader.show();

    // Uncomment when API is ready
    this.apiService.createIndependentTable(payload).subscribe({
      next: (response: any) => {
        this.loader.hide();
        this.toastr.success('Independent table created successfully');
        this.resetForm();
        this.router.navigate(['/panel/table-builder/view-all-independent-table']);
      },
      error: (error: any) => {
        this.loader.hide();
        this.toastr.error(error?.error?.message || 'Failed to create independent table');
      }
    });

    // Temporary - remove when API is ready
    setTimeout(() => {
      this.loader.hide();
      this.toastr.success('Independent table created successfully');
      this.resetForm();
    }, 1000);
  }

  // Cancel
  onCancel(): void {
    this.router.navigate(['/panel/table-builder/view-all-independent-table']);
  }

  // Reset Form
  resetForm(): void {
    this.rowTableName = '';
    this.description = '';
    this.columns = [
      {
        name: '',
        type: '',
        maxLength: undefined,
        precision: undefined,
        scale: undefined,
        lookupComponentCode: '',
        nullable: false,
        displayOrder: null,
        isTypeDropdownOpen: false
      }
    ];
  }
}
