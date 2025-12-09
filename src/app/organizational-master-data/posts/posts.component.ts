import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {

  // ✅ Dropdown Options
  dropdownOptions = {
    postNames: ['Main Gate', 'Back Gate', 'Warehouse', 'Office Building', 'Production Area', 
                'Security Booth', 'Parking Area', 'Reception', 'Loading Dock', 'Storage Area'],
    
    locationNames: ['Head Office', 'Branch A', 'Branch B', 'Factory Site', 'Warehouse Complex',
                   'Corporate Tower', 'Industrial Park', 'Commercial Plaza', 'Tech Park', 'Business Center'],
    
    customerNames: ['ABC Corporation', 'XYZ Ltd', 'Global Enterprises', 'Tech Solutions Inc',
                   'Manufacturing Co', 'Retail Chain', 'Service Provider', 'Consulting Firm',
                   'Logistics Company', 'Healthcare Group'],
    
    postTypes: ['Security Post', 'Reception Post', 'Gate Post', 'Patrol Post', 'Control Room',
               'Monitoring Post', 'Checkpoint', 'Access Point', 'Surveillance Post', 'Guard Post'],
    
    shifts: ['Morning Shift', 'Evening Shift', 'Night Shift', 'General Shift', 'Rotational Shift',
            'Fixed Shift', 'Flexible Shift', '12-Hour Shift', '8-Hour Shift', '24x7 Shift'],
    
    totalPostTimings: ['8 Hours', '12 Hours', '24 Hours', '6 Hours', '10 Hours',
                      '9 Hours', '7 Hours', '5 Hours', '4 Hours', '3 Hours'],
    
    supervisorNames: ['John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'Robert Wilson',
                     'Lisa Anderson', 'David Miller', 'Jennifer Taylor', 'James Moore', 'Patricia Lee']
  };

  // ✅ Posts Data
  posts = [
    {
      postsCode: 'POST001',
      postName: 'Main Gate',
      locationName: 'Head Office',
      customerName: 'ABC Corporation',
      dayConcept: 'Day Security',
      swingConcept: 'Regular Rotation',
      postType: 'Security Post',
      shift: 'Morning Shift',
      noOfDC: 2,
      noOfShifts: 3,
      noOfEmployeesPerShift: 2,
      totalPostTiming: '8 Hours',
      noOfDays: 30,
      totalManPower: 6,
      supervisorName: 'John Smith'
    },
    {
      postsCode: 'POST002',
      postName: 'Warehouse',
      locationName: 'Branch A',
      customerName: 'XYZ Ltd',
      dayConcept: 'Day Watch',
      swingConcept: 'Fixed Pattern',
      postType: 'Patrol Post',
      shift: 'Night Shift',
      noOfDC: 1,
      noOfShifts: 2,
      noOfEmployeesPerShift: 3,
      totalPostTiming: '12 Hours',
      noOfDays: 25,
      totalManPower: 6,
      supervisorName: 'Emma Johnson'
    },
    {
      postsCode: 'POST003',
      postName: 'Office Building',
      locationName: 'Corporate Tower',
      customerName: 'Global Enterprises',
      dayConcept: 'Office Security',
      swingConcept: 'Variable Rotation',
      postType: 'Reception Post',
      shift: 'General Shift',
      noOfDC: 3,
      noOfShifts: 4,
      noOfEmployeesPerShift: 2,
      totalPostTiming: '9 Hours',
      noOfDays: 31,
      totalManPower: 8,
      supervisorName: 'Michael Brown'
    },
    {
      postsCode: 'POST004',
      postName: 'Security Booth',
      locationName: 'Industrial Park',
      customerName: 'Tech Solutions Inc',
      dayConcept: 'Booth Security',
      swingConcept: 'Scheduled Rotation',
      postType: 'Control Room',
      shift: 'Evening Shift',
      noOfDC: 2,
      noOfShifts: 3,
      noOfEmployeesPerShift: 1,
      totalPostTiming: '8 Hours',
      noOfDays: 28,
      totalManPower: 3,
      supervisorName: 'Sarah Davis'
    },
    {
      postsCode: 'POST005',
      postName: 'Loading Dock',
      locationName: 'Warehouse Complex',
      customerName: 'Manufacturing Co',
      dayConcept: 'Dock Security',
      swingConcept: 'Fixed Schedule',
      postType: 'Access Point',
      shift: 'Rotational Shift',
      noOfDC: 1,
      noOfShifts: 2,
      noOfEmployeesPerShift: 4,
      totalPostTiming: '12 Hours',
      noOfDays: 26,
      totalManPower: 8,
      supervisorName: 'Robert Wilson'
    }
  ];

  // ✅ Form Fields
  postsCode = '';
  postName = '';
  locationName = '';
  customerName = '';
  dayConcept = '';
  swingConcept = '';
  postType = '';
  shift = '';
  noOfDC: number | null = null;
  noOfShifts: number | null = null;
  noOfEmployeesPerShift: number | null = null;
  totalPostTiming = '';
  noOfDays: number | null = null;
  totalManPower: number | null = null;
  supervisorName = '';

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredPosts().length / this.itemsPerPage);
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

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.postsCode &&
      this.postName &&
      this.locationName &&
      this.customerName &&
      this.dayConcept &&
      this.swingConcept &&
      this.postType &&
      this.shift &&
      this.noOfDC !== null && this.noOfDC > 0 &&
      this.noOfShifts !== null && this.noOfShifts > 0 &&
      this.noOfEmployeesPerShift !== null && this.noOfEmployeesPerShift > 0 &&
      this.totalPostTiming &&
      this.noOfDays !== null && this.noOfDays > 0 &&
      this.totalManPower !== null && this.totalManPower > 0 &&
      this.supervisorName
    );
  }

  // ✅ Pagination Data
  paginatedPosts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPosts().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createPost() {
    if (!this.isFormValid()) return;

    this.posts.push({
      postsCode: this.postsCode,
      postName: this.postName,
      locationName: this.locationName,
      customerName: this.customerName,
      dayConcept: this.dayConcept,
      swingConcept: this.swingConcept,
      postType: this.postType,
      shift: this.shift,
      noOfDC: this.noOfDC || 0,
      noOfShifts: this.noOfShifts || 0,
      noOfEmployeesPerShift: this.noOfEmployeesPerShift || 0,
      totalPostTiming: this.totalPostTiming,
      noOfDays: this.noOfDays || 0,
      totalManPower: this.totalManPower || 0,
      supervisorName: this.supervisorName
    });

    this.hideForm();
  }

  // ✅ Edit
  editPost(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const post = this.posts[index];
    this.postsCode = post.postsCode;
    this.postName = post.postName;
    this.locationName = post.locationName;
    this.customerName = post.customerName;
    this.dayConcept = post.dayConcept;
    this.swingConcept = post.swingConcept;
    this.postType = post.postType;
    this.shift = post.shift;
    this.noOfDC = post.noOfDC;
    this.noOfShifts = post.noOfShifts;
    this.noOfEmployeesPerShift = post.noOfEmployeesPerShift;
    this.totalPostTiming = post.totalPostTiming;
    this.noOfDays = post.noOfDays;
    this.totalManPower = post.totalManPower;
    this.supervisorName = post.supervisorName;
  }

  updatePost() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.posts[this.editIndex] = {
      postsCode: this.postsCode,
      postName: this.postName,
      locationName: this.locationName,
      customerName: this.customerName,
      dayConcept: this.dayConcept,
      swingConcept: this.swingConcept,
      postType: this.postType,
      shift: this.shift,
      noOfDC: this.noOfDC || 0,
      noOfShifts: this.noOfShifts || 0,
      noOfEmployeesPerShift: this.noOfEmployeesPerShift || 0,
      totalPostTiming: this.totalPostTiming,
      noOfDays: this.noOfDays || 0,
      totalManPower: this.totalManPower || 0,
      supervisorName: this.supervisorName
    };

    this.hideForm();
  }

  // ✅ Delete
  deletePost(index: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.posts.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.postsCode = '';
    this.postName = '';
    this.locationName = '';
    this.customerName = '';
    this.dayConcept = '';
    this.swingConcept = '';
    this.postType = '';
    this.shift = '';
    this.noOfDC = null;
    this.noOfShifts = null;
    this.noOfEmployeesPerShift = null;
    this.totalPostTiming = '';
    this.noOfDays = null;
    this.totalManPower = null;
    this.supervisorName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredPosts() {
    if (!this.searchText.trim()) return this.posts;

    const searchLower = this.searchText.toLowerCase();
    return this.posts.filter(post =>
      post.postsCode.toLowerCase().includes(searchLower) ||
      post.postName.toLowerCase().includes(searchLower) ||
      post.locationName.toLowerCase().includes(searchLower) ||
      post.customerName.toLowerCase().includes(searchLower) ||
      post.supervisorName.toLowerCase().includes(searchLower)
    );
  }
}