import { Component, HostListener } from '@angular/core';
import { ApiService } from '../../../shared/services/apis/api.service';
import { DynamicFieldDto } from '../../../shared/dtos/Dto';
import { LoaderService } from '../../../shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  // View States
  showForm = false;
  isEdit = false;
  showViewModal = false;

  // Table Controls
  itemsPerPage = 10;
  currentPage = 1;
  searchText = '';
  selectedErp = '';

  // Active Tab Management
  activeTabId = 1; // Default: Personal Details (Employees Form)

  // Main Employee Form Data (Complete Employees Form from your code)
  employeeFormData = {
    // Basic Information (from your screenshot and original form)
    code: '',
    legacyCode: '',
    name: '',
    fatherName: '',
    employeeCategory: '',
    gender: '',
    jobTitle: '',
    company: '',
    manager: '',
    department: '',
    dob: '',
    nationality: '',
    mobileNumber: '',
    email: '',
    dateOfJoining: '',
    homeAddress: '',
    bloodGroup: '',
    sponsor: '',
    contractNo: '',
    employeeGrade: '',
    religion: '',
    maritalStatus: '',
    medicalInsuranceNo: '',
    emergencyContact: '',
    visaType: '',
    visaIqamaId: '',
    visaExpiryDate: '',
    bankName: '',
    accountNumber: '',
    remarks: '',
    currentStatus: '',
    project: '',
    lastIncrementDate: '',
    lastIncrementAmount: '',
    paymentMethod: '',
    disability: '',
    employeeType: '',
    buildingNumber: '',
    streetName: '',
    districtName: '',
    country: '',
    city: '',
    countryCode: '',
    active: true,

    // Personal Details from screenshot
    employeeId: '4222',
    otherId: 'emp05',
    firstName: 'akash',
    middleName: 'Automation',
    lastName: 'lala',
    driversLicense: 'GJ3234263',
    licenseExpiry: '2025-02-15',
    nationality2: 'Micronesian', // Different name to avoid conflict
    maritalStatus2: 'Married', // Different name to avoid conflict
    dob2: '2010-11-18',
    gender2: 'Male', // Different name to avoid conflict
  };

  // Dropdown Options (from your original code)
  dropdownOptions = {
    employeeCategories: ['Category A', 'Category B', 'Category C', 'Category D'],
    genders: ['Male', 'Female', 'Other'],
    jobTitles: ['Admin Officer', 'Manager', 'Developer', 'HR Executive'],
    companies: ['Company A', 'Company B', 'Company C'],
    managers: ['John Doe', 'Jane Smith', 'Robert Johnson'],
    departments: ['HR', 'IT', 'Finance', 'Operations'],
    nationalities: ['Saudi', 'Pakistani', 'Indian', 'American', 'Micronesian'],
    sponsors: ['Yes', 'No'],
    employeeGrades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'],
    maritalStatuses: ['Single', 'Married', 'Divorced', 'Widowed'],
    visaTypes: ['Employment', 'Business', 'Visit'],
    currentStatuses: ['Active', 'Inactive', 'On Leave', 'Terminated'],
    projects: ['Project A', 'Project B', 'Project C'],
    paymentMethods: ['Bank Transfer', 'Cash', 'Cheque'],
    disabilities: ['Yes', 'No'],
    employeeTypes: ['Permanent', 'Contract', 'Temporary'],
    countries: ['Saudi Arabia', 'Pakistan', 'India', 'USA'],
    cities: ['Riyadh', 'Jeddah', 'Karachi', 'Lahore']
  };

  // Sidebar Tabs Data (All modal tabs moved to sidebar)
  sidebarTabs: any[] = [
    { id: 1, name: 'Personal Details', icon: 'fa-user', active: true },
    { id: 2, name: 'Employee Cost Info', icon: 'fa-calculator' },
    { id: 3, name: 'Employee ID Info', icon: 'fa-id-card' },
    { id: 4, name: 'Employee Leave Info', icon: 'fa-calendar' },
    { id: 5, name: 'Employee Salary Info', icon: 'fa-credit-card' },
    { id: 6, name: 'Qualification', icon: 'fa-graduation-cap' },
    { id: 7, name: 'Skills', icon: 'fa-cogs' },
    { id: 8, name: 'Trainings', icon: 'fa-book' },
    { id: 9, name: 'Experience', icon: 'fa-briefcase' },
    { id: 10, name: 'Family Detail', icon: 'fa-users' },
    { id: 11, name: 'Employee Belongings', icon: 'fa-suitcase' },
    { id: 12, name: 'Pre Requisite', icon: 'fa-tasks' }
  ];

  // Profile Image
  profileImage: string = 'assets/images/default-avatar.png';
  profileImageFile: File | null = null;

  // Sample Data for Table
  employees = [
    {
      sr: 1,
      code: 'EMP-00001',
      legacyCode: 'LG001',
      name: 'John Doe',
      jobTitle: 'Admin Officer',
      project: 'Project A',
      email: 'john@example.com',
      mobileNo: '1234567890',
      status: 'Active'
    },
    {
      sr: 2,
      code: 'EMP-00002',
      legacyCode: 'LG002',
      name: 'Jane Smith',
      jobTitle: 'Manager',
      project: 'Project B',
      email: 'jane@example.com',
      mobileNo: '0987654321',
      status: 'Active'
    },
    {
      sr: 3,
      code: 'EMP-00003',
      legacyCode: 'LG003',
      name: 'Robert Johnson',
      jobTitle: 'Developer',
      project: 'Project C',
      email: 'robert@example.com',
      mobileNo: '5555555555',
      status: 'Inactive'
    }
  ];

  // Dynamic Fields
  dynamicFields: DynamicFieldDto[] = [];
  dynamicFieldsData: { [key: string]: any } = {};
  rowTableFields: DynamicFieldDto[] = []; // Fields with ROW type
  rowTableData: { [fieldCode: string]: { [columnCode: string]: any } } = {}; // Store row column data

  // Data for other tabs
  otherTabsData = [
    { name: 'John Doe', email: 'john@example.com', contact: '1234567890', address: '123 Street' },
    { name: 'Jane Smith', email: 'jane@example.com', contact: '0987654321', address: '456 Avenue' }
  ];

  constructor(private api: ApiService, private toastr: ToastrService, private loader: LoaderService) {
    this.api.getFormById('EMPLOYEE_REQUISITION', 'USER_DEFINED').subscribe((res: any) => {
      const allFields = res.data.fields || [];

      // Map to DTOs to ensure all properties have default values
      const mappedFields = allFields.map((f: any) => new DynamicFieldDto(f));

      // Separate ROW fields for tabs and other fields for display
      this.dynamicFields = mappedFields.filter((f: DynamicFieldDto) => f.fieldType !== 'ROW');
      this.rowTableFields = mappedFields.filter((f: DynamicFieldDto) => f.fieldType === 'ROW');

      // Add ROW fields as new tabs in sidebar
      this.rowTableFields.forEach((field: DynamicFieldDto, index: number) => {
        this.sidebarTabs.push({
          id: 13 + index,
          name: field.label,
          icon: 'fa-table',
          active: false,
          rowTableField: field // Store reference to the field
        });
      });
    });
  }
  // Pagination Methods
  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.employees.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Form Methods
  onNew() {
    this.showForm = true;
    this.isEdit = false;
    this.resetForm();
    this.setActiveTab(1); // Reset to Personal Details tab
  }

  editEmployee(index: number) {
    this.showForm = true;
    this.isEdit = true;
    // Load employee data
    const emp = this.employees[index];
    this.employeeFormData.code = emp.code;
    this.employeeFormData.legacyCode = emp.legacyCode;
    this.employeeFormData.name = emp.name;
    this.employeeFormData.jobTitle = emp.jobTitle;
    this.employeeFormData.project = emp.project;
    this.employeeFormData.email = emp.email;
    this.employeeFormData.mobileNumber = emp.mobileNo;
    this.employeeFormData.currentStatus = emp.status;
    this.setActiveTab(1); // Reset to Personal Details tab
  }

  viewEmployee(index: number) {
    this.showViewModal = true;
  }

  closeModals() {
    this.showViewModal = false;
  }

  resetForm() {
    // Reset all form data
    this.employeeFormData = {
      code: '',
      legacyCode: '',
      name: '',
      fatherName: '',
      employeeCategory: '',
      gender: '',
      jobTitle: '',
      company: '',
      manager: '',
      department: '',
      dob: '',
      nationality: '',
      mobileNumber: '',
      email: '',
      dateOfJoining: '',
      homeAddress: '',
      bloodGroup: '',
      sponsor: '',
      contractNo: '',
      employeeGrade: '',
      religion: '',
      maritalStatus: '',
      medicalInsuranceNo: '',
      emergencyContact: '',
      visaType: '',
      visaIqamaId: '',
      visaExpiryDate: '',
      bankName: '',
      accountNumber: '',
      remarks: '',
      currentStatus: '',
      project: '',
      lastIncrementDate: '',
      lastIncrementAmount: '',
      paymentMethod: '',
      disability: '',
      employeeType: '',
      buildingNumber: '',
      streetName: '',
      districtName: '',
      country: '',
      city: '',
      countryCode: '',
      active: true,
      employeeId: '',
      otherId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      driversLicense: '',
      licenseExpiry: '',
      nationality2: '',
      maritalStatus2: '',
      dob2: '',
      gender2: 'Male'
    };
  }

  saveEmployee() {
    // Prepare complete data with dynamic fields
    const completeData = {
      data: {
        ...this.employeeFormData,
        ...this.dynamicFieldsData,
      },
      rows: this.getRowTableFieldsData() // Get data from all row table tabs
    };

    if (this.isEdit) {
      console.log('Updating employee:');
      console.log('Static Fields:', this.employeeFormData);
      console.log('Dynamic Fields:', this.dynamicFieldsData);
      console.log('Row Table Fields (rows):', this.getRowTableFieldsData());
      console.log('Complete Data:', completeData);
    } else {
      console.log('Creating employee:');
      console.log('Static Fields:', this.employeeFormData);
      console.log('Dynamic Fields:', this.dynamicFieldsData);
      console.log('Row Table Fields (rows):', this.getRowTableFieldsData());
      console.log('Complete Data:', completeData);
    }
    this.showForm = false;
    this.loader.show();
    this.api.saveFormData('EMPLOYEE_REQUISITION', completeData).subscribe({
      next: (res: any) => {
        console.log('Employee saved successfully:', res);
        this.toastr.success('Employee data saved successfully');
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error saving employee data:', err);
        this.toastr.error('Failed to save employee data');
        this.loader.hide();
      }
    });
  }

  // Get all row table fields data in required format
  getRowTableFieldsData() {
    const rows: { [key: string]: any[] } = {};

    this.rowTableFields.forEach((field: DynamicFieldDto) => {
      // Each row table field becomes an array of objects
      const rowArray: any[] = [];

      // Collect data from each row table field's columns as a single object
      if (field.rowColumns && field.rowColumns.length > 0) {
        const rowObject: { [key: string]: any } = {};

        field.rowColumns.forEach((column: any) => {
          // Use fieldCode as key and selectedValue as value
          if (column.fieldCode) {
            rowObject[column.fieldCode] = column.selectedValue || null;
          }
        });

        // Add the row object to the array (currently single row, can be extended for multiple rows)
        rowArray.push(rowObject);
      }

      // Store under the parent field's fieldCode as an array
      rows[field.fieldCode] = rowArray;
    });

    return rows;
  }

  cancelForm() {
    this.showForm = false;
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
    this.sidebarTabs.forEach(tab => {
      tab.active = tab.id === tabId;
    });
  }

  // Validation
  isFormValid(): boolean {
    return !!this.employeeFormData.code && !!this.employeeFormData.name && !!this.employeeFormData.email;
  }

  // Profile Image Methods
  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Search Filter
  get filteredEmployees() {
    if (!this.searchText) return this.employees;
    const search = this.searchText.toLowerCase();
    return this.employees.filter(emp =>
      emp.name.toLowerCase().includes(search) ||
      emp.code.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search)
    );
  }

  // Dynamic Fields Methods
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.dynamicFields.forEach(f => f.isDropdownOpen = false);

      // Close row column dropdowns
      this.rowTableFields.forEach(field => {
        if (field.rowColumns) {
          field.rowColumns.forEach((col: any) => col.isDropdownOpen = false);
        }
      });
    }
  }

  toggleDynamicDropdown(field: any, event: Event) {
    event.stopPropagation();
    field.isDropdownOpen = !field.isDropdownOpen;

    // Close other dropdowns
    this.dynamicFields.forEach(f => {
      if (f !== field) f.isDropdownOpen = false;
    });

    // Load options on first open if not already loaded
    if (field.isDropdownOpen && !field.optionsLoaded) {
      if (field.fieldType === 'LOOKUP_TABLE' && field.lookupTable) {
        this.loadLookupTableOptions(field);
      }
    }
  }

  selectDynamicOption(field: any, option: any, event: Event) {
    event.stopPropagation();
    if (field.fieldType === 'LOOKUP_ENUM') {
      this.dynamicFieldsData[field.fieldCode] = option;
    } else {
      this.dynamicFieldsData[field.fieldCode] = option.id || option.code || option;
    }
    field.isDropdownOpen = false;
  }

  getSelectedDisplayText(field: any): string {
    const selectedValue = this.dynamicFieldsData[field.fieldCode];
    if (!selectedValue) {
      return 'Select ' + field.label;
    }
    if (field.options) {
      const option = field.options.find((opt: any) =>
        (opt.id || opt.code) === selectedValue
      );
      return option?.displayText || option?.name || selectedValue;
    }
    return selectedValue;
  }

  loadLookupTableOptions(field: any) {
    this.api.getLokupTableByCode(field.lookupTable).subscribe({
      next: (res: any) => {
        field.options = res.data || [];
        field.optionsLoaded = true;
      },
      error: (err) => {
        console.error('Error loading lookup table options:', err);
        field.options = [];
        field.optionsLoaded = true;
      }
    });
  }

  // Row Table Column Methods
  toggleRowColumnDropdown(column: any, event: Event) {
    event.stopPropagation();
    column.isDropdownOpen = !column.isDropdownOpen;

    // Load options on first open if not already loaded
    if (column.isDropdownOpen && !column.optionsLoaded) {
      if (column.fieldType === 'LOOKUP_TABLE' && column.lookupTable) {
        this.loadRowColumnLookupOptions(column);
      }
    }
  }

  selectRowColumnOption(column: any, option: any, event: Event) {
    event.stopPropagation();
    if (column.fieldType === 'LOOKUP_ENUM') {
      column.selectedValue = option;
    } else {
      column.selectedValue = option.id || option.code || option;
    }
    column.isDropdownOpen = false;
  }

  getRowColumnDisplayText(column: any): string {
    const selectedValue = column.selectedValue;
    if (!selectedValue) {
      return 'Select ' + (column.label || column.name);
    }
    if (column.options) {
      const option = column.options.find((opt: any) =>
        (opt.id || opt.code) === selectedValue
      );
      return option?.displayText || option?.name || selectedValue;
    }
    return selectedValue;
  }

  loadRowColumnLookupOptions(column: any) {

    this.api.getLokupTableByCode(column.linkedComponent).subscribe({
      next: (res: any) => {
        column.options = res.data || [];
        column.optionsLoaded = true;
      },
      error: (err) => {
        console.error('Error loading row column lookup options:', err);
        column.options = [];
        column.optionsLoaded = true;
      }
    });
  }
}