import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-medical-insurance',
  templateUrl: './medical-insurance.component.html',
  styleUrls: ['./medical-insurance.component.scss'],
})
export class MedicalInsuranceComponent {

   title = 'view';
  formTitle = ""
    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Medical Insurance"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Medical Insurance"


      }
    });
  }

  // ✅ Medical Insurance Data with 5 fields
  medicalInsurances = [
    { code: 'MI001', description: 'Basic Health Coverage', fromDate: '2024-01-01', toDate: '2024-12-31', provider: 'ABC Health Insurance' },
    { code: 'MI002', description: 'Premium Family Plan', fromDate: '2024-03-01', toDate: '2025-02-28', provider: 'XYZ Insurance Co.' },
    { code: 'MI003', description: 'Senior Citizen Plan', fromDate: '2024-01-15', toDate: '2024-12-15', provider: 'HealthCare Plus' },
    { code: 'MI004', description: 'Corporate Group Insurance', fromDate: '2024-02-01', toDate: '2025-01-31', provider: 'Global Insurers' },
    { code: 'MI005', description: 'Critical Illness Cover', fromDate: '2024-04-01', toDate: '2025-03-31', provider: 'SecureLife Insurance' },
    { code: 'MI006', description: 'Maternity Benefit Plan', fromDate: '2024-01-01', toDate: '2024-12-31', provider: 'Family Care Insurance' },
    { code: 'MI007', description: 'Dental & Vision Plan', fromDate: '2024-05-01', toDate: '2025-04-30', provider: 'Wellness Insurance' },
    { code: 'MI008', description: 'Accident Coverage', fromDate: '2024-03-15', toDate: '2025-03-14', provider: 'SafeGuard Insurance' },
    { code: 'MI009', description: 'International Travel Insurance', fromDate: '2024-01-01', toDate: '2024-12-31', provider: 'TravelSafe Inc.' },
    { code: 'MI010', description: 'Student Health Plan', fromDate: '2024-08-01', toDate: '2025-07-31', provider: 'EduHealth Insurance' }
  ];

  fetchMedicalInsurance() {
    return this.medicalInsurances;
  }

  // ✅ Form + State
  showForm = false;
  itemCode = '';
  itemDescription = '';
  itemFromDate = '';
  itemToDate = '';
  itemProvider = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredItems().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    const total = this.totalPages;

    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (this.currentPage === 1) return [1, 2, 3];
    if (this.currentPage === total) return [total - 2, total - 1, total];

    return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
  }

  // ✅ Pagination Data
  paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/employees-master-data/create-new-medical-insurance']);

  }

  createItem() {
    if (!this.itemCode || !this.itemDescription || !this.itemFromDate || !this.itemToDate || !this.itemProvider) {
      alert('Please fill all required fields');
      return;
    }

    // Validate date range
    if (new Date(this.itemToDate) < new Date(this.itemFromDate)) {
      alert('To Date cannot be earlier than From Date');
      return;
    }

    this.medicalInsurances.push({
      code: this.itemCode,
      description: this.itemDescription,
      fromDate: this.itemFromDate,
      toDate: this.itemToDate,
      provider: this.itemProvider
    });

    this.hideForm();
  }

  // ✅ Edit
  editItem() {
    
            this.router.navigate(['/panel/employees-master-data/edit-medical-insurance']);

  }

  updateItem() {
    if (this.editIndex === null) return;

    // Validate date range
    if (new Date(this.itemToDate) < new Date(this.itemFromDate)) {
      alert('To Date cannot be earlier than From Date');
      return;
    }

    this.medicalInsurances[this.editIndex] = {
      code: this.itemCode,
      description: this.itemDescription,
      fromDate: this.itemFromDate,
      toDate: this.itemToDate,
      provider: this.itemProvider
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this medical insurance record?')) {
      this.medicalInsurances.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
            this.router.navigate(['/panel/employees-master-data/view-all-medical-insurance']);


  }

  resetForm() {
    this.itemCode = '';
    this.itemDescription = '';
    this.itemFromDate = '';
    this.itemToDate = '';
    this.itemProvider = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredItems() {
    if (!this.searchText.trim()) return this.medicalInsurances;

    const searchLower = this.searchText.toLowerCase();
    return this.medicalInsurances.filter(item =>
      item.code.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.provider.toLowerCase().includes(searchLower) ||
      item.fromDate.includes(searchLower) ||
      item.toDate.includes(searchLower)
    );
  }

  // ✅ Helper method to format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  }
}