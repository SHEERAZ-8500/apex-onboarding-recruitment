import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReqFormDto } from '../../../shared/dtos/Dto';


@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent {

   title = 'view';
  formTitle = ""
formData = new ReqFormDto();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Interview Result"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Interview Result"


      }
    });
  }

  // ✅ Date Configuration
  today = new Date();
  minDate = '1900-01-01';
  maxDate = '2099-12-31';

  // ✅ Dropdown Options
  dropdownOptions = {
    designations: [
      'Software Engineer',
      'Senior Software Engineer',
      'Team Lead',
      'Project Manager',
      'Product Manager',
      'HR Manager',
      'Business Analyst',
      'Quality Analyst',
      'DevOps Engineer',
      'System Administrator'
    ],
    
    statusOptions: [
      'Active',
      'InActive',
      'Pending',
      'Approved',
      'Rejected',
      'Completed'
    ]
  };

  // ✅ Requisitions Data
  requisitions = [
    {
      requisitionNumber: 1001,
      requisitionName: 'Software Engineers Hiring',
      designationName: 'Software Engineer',
      intraCountryEmployees: 5,
      interCountryEmployees: 2,
      numberOfInterviews: 10,
      trainingRequired: 'Basic Java & Spring Boot',
      requiredDate: '2024-03-15',
      description: 'Need experienced Java developers',
      status: 'Active'
    },
    {
      requisitionNumber: 1002,
      requisitionName: 'Project Managers',
      designationName: 'Project Manager',
      intraCountryEmployees: 3,
      interCountryEmployees: 1,
      numberOfInterviews: 8,
      trainingRequired: 'Agile & Scrum Master',
      requiredDate: '2024-03-20',
      description: 'PM with 5+ years experience',
      status: 'Pending'
    },
    {
      requisitionNumber: 1003,
      requisitionName: 'Quality Analysts',
      designationName: 'Quality Analyst',
      intraCountryEmployees: 4,
      interCountryEmployees: 0,
      numberOfInterviews: 6,
      trainingRequired: 'Automation Testing',
      requiredDate: '2024-03-10',
      description: 'QA with Selenium experience',
      status: 'Active'
    },
    {
      requisitionNumber: 1004,
      requisitionName: 'DevOps Team',
      designationName: 'DevOps Engineer',
      intraCountryEmployees: 2,
      interCountryEmployees: 1,
      numberOfInterviews: 5,
      trainingRequired: 'AWS & Kubernetes',
      requiredDate: '2024-03-25',
      description: 'DevOps with cloud experience',
      status: 'Approved'
    },
    {
      requisitionNumber: 1005,
      requisitionName: 'Business Analysts',
      designationName: 'Business Analyst',
      intraCountryEmployees: 3,
      interCountryEmployees: 0,
      numberOfInterviews: 7,
      trainingRequired: 'Requirement Gathering',
      requiredDate: '2024-03-30',
      description: 'BA with finance domain',
      status: 'InActive'
    }
  ];


  // ✅ Form Fields
  requisitionNumber: number | null = null;
  requisitionName = '';
  designationName = '';
  numberOfInterviews: number | null = null;
  intraCountryEmployees: number | null = null;
  interCountryEmployees: number | null = null;
  requiredDate = '';
  trainingRequired = '';
  description = '';
  status = '';

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;
     paginatedRequisitionsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredRequisitions().length / this.itemsPerPage);
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

  // ✅ Helper Methods
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.requisitionNumber !== null && this.requisitionNumber > 0 &&
      this.requisitionName &&
      this.designationName &&
      this.numberOfInterviews !== null && this.numberOfInterviews >= 0 &&
      this.intraCountryEmployees !== null && this.intraCountryEmployees >= 0 &&
      this.interCountryEmployees !== null && this.interCountryEmployees >= 0 &&
      this.requiredDate &&
      this.status
    );
  }

  // ✅ Pagination Data


  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }



    updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredRequisitions();
    this.paginatedRequisitionsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }



  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
            this.router.navigate(['/panel/recruitment-forms/create-new-requisition']);

  }

  createRequisition() {
    if (!this.isFormValid()) return;

    this.requisitions.push({
      requisitionNumber: this.requisitionNumber || 0,
      requisitionName: this.requisitionName,
      designationName: this.designationName,
      intraCountryEmployees: this.intraCountryEmployees || 0,
      interCountryEmployees: this.interCountryEmployees || 0,
      numberOfInterviews: this.numberOfInterviews || 0,
      trainingRequired: this.trainingRequired,
      requiredDate: this.requiredDate,
      description: this.description,
      status: this.status
    });

    this.hideForm();
  }

  // ✅ Edit
  editRequisition() {
                this.router.navigate(['/panel/recruitment-forms/edit-requisition']);

   
  }

  updateRequisition() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.requisitions[this.editIndex] = {
      requisitionNumber: this.requisitionNumber || 0,
      requisitionName: this.requisitionName,
      designationName: this.designationName,
      intraCountryEmployees: this.intraCountryEmployees || 0,
      interCountryEmployees: this.interCountryEmployees || 0,
      numberOfInterviews: this.numberOfInterviews || 0,
      trainingRequired: this.trainingRequired,
      requiredDate: this.requiredDate,
      description: this.description,
      status: this.status
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteRequisition(index: number) {
    if (confirm('Are you sure you want to delete this requisition?')) {
      this.requisitions.splice(index, 1);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
                this.router.navigate(['/panel/recruitment-forms/view-all-requisition']);

  }

  resetForm() {
    this.requisitionNumber = null;
    this.requisitionName = '';
    this.designationName = '';
    this.numberOfInterviews = null;
    this.intraCountryEmployees = null;
    this.interCountryEmployees = null;
    this.requiredDate = '';
    this.trainingRequired = '';
    this.description = '';
    this.status = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredRequisitions() {
    if (!this.searchText.trim()) return this.requisitions;

    const searchLower = this.searchText.toLowerCase();
    return this.requisitions.filter(req =>
      req.requisitionName.toLowerCase().includes(searchLower) ||
      req.designationName.toLowerCase().includes(searchLower) ||
      req.trainingRequired.toLowerCase().includes(searchLower) ||
      req.description.toLowerCase().includes(searchLower) ||
      req.status.toLowerCase().includes(searchLower) ||
      req.requisitionNumber.toString().includes(searchLower)
    );
  }
}