import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrls: ['./offer-letter.component.scss']
})
export class OfferLetterComponent {

 title = 'view';
  formTitle = ""
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
        this.formTitle = "Edit Offer Letter"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Offer Letter"


      }
    });
  }

  // ✅ Offer Letters Data
  offerLetters = [
    {
      requisitionId: 'REQ001',
      candidate: 'John Smith',
      offerLetterStatus: 'Sent',
      name: 'John Smith',
      designationName: 'Senior Developer',
      departmentName: 'IT Department',
      status: 'Active',
      reason: 'Pending documentation'
    },
    {
      requisitionId: 'REQ002',
      candidate: 'Sarah Johnson',
      offerLetterStatus: 'Accepted',
      name: 'Sarah Johnson',
      designationName: 'UI/UX Designer',
      departmentName: 'Design Team',
      status: 'Completed',
      reason: 'All clear'
    },
    {
      requisitionId: 'REQ003',
      candidate: 'Michael Brown',
      offerLetterStatus: 'Pending',
      name: 'Michael Brown',
      designationName: 'Project Manager',
      departmentName: 'Management',
      status: 'Pending',
      reason: 'Waiting for approval'
    },
    {
      requisitionId: 'REQ004',
      candidate: 'Emma Wilson',
      offerLetterStatus: 'Rejected',
      name: 'Emma Wilson',
      designationName: 'DevOps Engineer',
      departmentName: 'Operations',
      status: 'Cancelled',
      reason: 'Candidate declined'
    },
    {
      requisitionId: 'REQ005',
      candidate: 'David Lee',
      offerLetterStatus: 'Sent',
      name: 'David Lee',
      designationName: 'QA Engineer',
      departmentName: 'Testing',
      status: 'Active',
      reason: 'Background check in progress'
    },
    {
      requisitionId: 'REQ006',
      candidate: 'Lisa Taylor',
      offerLetterStatus: 'Accepted',
      name: 'Lisa Taylor',
      designationName: 'Business Analyst',
      departmentName: 'Analysis',
      status: 'Completed',
      reason: 'Joined successfully'
    },
    {
      requisitionId: 'REQ007',
      candidate: 'Robert Clark',
      offerLetterStatus: 'Pending',
      name: 'Robert Clark',
      designationName: 'Database Admin',
      departmentName: 'IT Department',
      status: 'Pending',
      reason: 'Salary negotiation'
    },
    {
      requisitionId: 'REQ008',
      candidate: 'Maria Garcia',
      offerLetterStatus: 'Sent',
      name: 'Maria Garcia',
      designationName: 'HR Manager',
      departmentName: 'Human Resources',
      status: 'Active',
      reason: 'Offer under review'
    }
  ];


  // ✅ Form Fields
  requisitionId = '';
  candidate = '';
  offerLetterStatus = '';
  name = '';
  designationName = '';
  departmentName = '';
  reason = '';

  // ✅ Form + State
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Dropdown Options
  requisitionIds = ['REQ001', 'REQ002', 'REQ003', 'REQ004', 'REQ005', 'REQ006', 'REQ007', 'REQ008'];
  candidates = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee', 'Lisa Taylor', 'Robert Clark', 'Maria Garcia'];
  offerLetterStatuses = ['Sent', 'Accepted', 'Pending', 'Rejected', 'Expired'];
  designationNames = ['Senior Developer', 'UI/UX Designer', 'Project Manager', 'DevOps Engineer', 'QA Engineer', 'Business Analyst', 'Database Admin', 'HR Manager'];
  departmentNames = ['IT Department', 'Design Team', 'Management', 'Operations', 'Testing', 'Analysis', 'Human Resources', 'Finance'];
  statusOptions = ['Active', 'Completed', 'Pending', 'Cancelled', 'On Hold'];

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
     paginatedOfferLettersList: any[] = [];



  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredOfferLetters().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }



    updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredOfferLetters();
    this.paginatedOfferLettersList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }


  // ✅ Status Styling
  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'badge bg-success';
      case 'Completed':
        return 'badge bg-primary';
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Cancelled':
        return 'badge bg-danger';
      case 'On Hold':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
      this.router.navigate(['/panel/selection/create-new-offer-letter']);
  }

  createOfferLetter() {
    if (!this.requisitionId || !this.candidate || !this.offerLetterStatus || !this.name) return;

    this.offerLetters.push({
      requisitionId: this.requisitionId,
      candidate: this.candidate,
      offerLetterStatus: this.offerLetterStatus,
      name: this.name,
      designationName: this.designationName || this.designationNames[0],
      departmentName: this.departmentName || this.departmentNames[0],
      status: this.getStatusFromOfferLetterStatus(this.offerLetterStatus),
      reason: this.reason || 'N/A'
    });

    this.hideForm();
  }

  // ✅ Edit
  editOfferLetter() {

      this.router.navigate(['/panel/selection/edit-offer-letter']);
  }

  updateOfferLetter() {
    if (this.editIndex === null) return;

    this.offerLetters[this.editIndex] = {
      requisitionId: this.requisitionId,
      candidate: this.candidate,
      offerLetterStatus: this.offerLetterStatus,
      name: this.name,
      designationName: this.designationName,
      departmentName: this.departmentName,
      status: this.getStatusFromOfferLetterStatus(this.offerLetterStatus),
      reason: this.reason
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteOfferLetter(index: number) {
    if (confirm('Are you sure you want to delete this offer letter?')) {
      this.offerLetters.splice(index, 1);

       if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
      this.router.navigate(['/panel/selection/view-all-offer-letter']);
  }

  resetForm() {
    this.requisitionId = '';
    this.candidate = '';
    this.offerLetterStatus = '';
    this.name = '';
    this.designationName = '';
    this.departmentName = '';
    this.reason = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredOfferLetters() {
    if (!this.searchText.trim()) return this.offerLetters;

    const searchLower = this.searchText.toLowerCase();
    return this.offerLetters.filter(offer =>
      offer.requisitionId.toLowerCase().includes(searchLower) ||
      offer.name.toLowerCase().includes(searchLower) ||
      offer.candidate.toLowerCase().includes(searchLower) ||
      offer.designationName.toLowerCase().includes(searchLower) ||
      offer.departmentName.toLowerCase().includes(searchLower) ||
      offer.status.toLowerCase().includes(searchLower) ||
      offer.reason.toLowerCase().includes(searchLower)
    );
  }

  // ✅ Helper method to map offer letter status to status
  private getStatusFromOfferLetterStatus(offerStatus: string): string {
    switch (offerStatus) {
      case 'Sent':
        return 'Active';
      case 'Accepted':
        return 'Completed';
      case 'Pending':
        return 'Pending';
      case 'Rejected':
        return 'Cancelled';
      case 'Expired':
        return 'Cancelled';
      default:
        return 'Active';
    }
  }
}