import { Component } from '@angular/core';

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
  showTabsModal = false;
  
  // Table Controls
  itemsPerPage = 10;
  currentPage = 1;
  searchText = '';
  selectedErp = '';
  
  // Form Data
  employeeData = {
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
    active: true
  };
  
  // Dropdown Options
  dropdownOptions = {
    employeeCategories: ['Category A', 'Category B', 'Category C', 'Category D'],
    genders: ['Male', 'Female', 'Other'],
    jobTitles: ['Admin Officer', 'Manager', 'Developer', 'HR Executive'],
    companies: ['Company A', 'Company B', 'Company C'],
    managers: ['John Doe', 'Jane Smith', 'Robert Johnson'],
    departments: ['HR', 'IT', 'Finance', 'Operations'],
    nationalities: ['Saudi', 'Pakistani', 'Indian', 'American'],
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
  
  // View Modal Data
  viewEmployeeData = {
    code: 'EMP-00000',
    name: 'Naveed Rasheed',
    jobTitle: 'Admin Officer',
    department: 'HR',
    email: 'naveed@gmail.com',
    mobileNo: '2342343243245',
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    active: 'false',
    remarks: 're',
    gender: 'Male',
    currentCustomer: '',
    dob: '05/26/1990',
    idNumber: '',
    gosiId: '123',
    dateOfJoining: '12/31/2022',
    passportNo: 'Lahore',
    homeAddress: '',
    bloodGroup: 'B+',
    sponsor: 'No',
    contractNo: 'NH7434',
    overtimeFactor: '1.5',
    lastIncrementDate: '12/03/2022',
    religion: 'Islam',
    maritalStatus: 'Single',
    passportExpiryDate: '',
    visaAqamaId: '222',
    visaAqamaExpiryDate: '06/09/2025'
  };
  
  // Tabs Data
  tabs = [
    { id: 1, name: 'Employee Cost Info', active: true },
    { id: 2, name: 'Employee ID Info', active: false },
    { id: 3, name: 'Employee Leave Info', active: false },
    { id: 4, name: 'Employee Salary Info', active: false },
    { id: 5, name: 'Qualification', active: false },
    { id: 6, name: 'Skills', active: false },
    { id: 7, name: 'Trainings', active: false },
    { id: 8, name: 'Experience', active: false },
    { id: 9, name: 'Family Detail', active: false },
    { id: 10, name: 'Employee Belongings', active: false },
    { id: 11, name: 'Pre Requisite', active: false }
  ];
  
  activeTab = this.tabs[0];
  
  // Tab Table Data
  tabTableData = [
    { name: 'John Doe', email: 'john@example.com', contact: '1234567890', address: '123 Street' },
    { name: 'Jane Smith', email: 'jane@example.com', contact: '0987654321', address: '456 Avenue' }
  ];
  
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
  }
  
  editEmployee(index: number) {
    this.showForm = true;
    this.isEdit = true;
    // In real app, load employee data by ID
    this.employeeData = { ...this.employees[index] as any };
  }
  
  viewEmployee(index: number) {
    this.showViewModal = true;
  }
  
  openTabsModal() {
    this.showTabsModal = true;
  }
  
  closeModals() {
    this.showViewModal = false;
    this.showTabsModal = false;
  }
  
  resetForm() {
    this.employeeData = {
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
      active: true
    };
  }
  
  saveEmployee() {
    if (this.isEdit) {
      // Update logic
      console.log('Updating employee:', this.employeeData);
    } else {
      // Create logic
      console.log('Creating employee:', this.employeeData);
    }
    this.showForm = false;
  }
  
  cancelForm() {
    this.showForm = false;
  }
  
  setActiveTab(tab: any) {
    this.tabs.forEach(t => t.active = false);
    tab.active = true;
    this.activeTab = tab;
  }
  
  // Validation
  isFormValid(): boolean {
    return !!this.employeeData.code && !!this.employeeData.name && !!this.employeeData.email;
  }
  
  // Utility
  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
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
  // Add these properties to the existing component class
profileImage: string = 'assets/images/default-avatar.png';
profileImageFile: File | null = null;
isImageUploading = false;
imagePreview: string | ArrayBuffer | null = null;

// Add this method for image handling
onProfileImageChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.profileImageFile = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
      this.profileImage = this.imagePreview as string;
    };
    reader.readAsDataURL(file);
    
    // In real app, upload to server here
    this.isImageUploading = true;
    setTimeout(() => {
      this.isImageUploading = false;
      console.log('Image uploaded successfully');
    }, 1500);
  }
}

removeProfileImage() {
  this.profileImage = 'assets/images/default-avatar.png';
  this.profileImageFile = null;
  this.imagePreview = null;
}
}