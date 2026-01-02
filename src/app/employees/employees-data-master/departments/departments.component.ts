import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent {
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
        this.formTitle = "Edit Department"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Department"


      }
    });
  }

  
  departments = [
    { code: 'DEPT001', name: 'Human Resources', description: 'Handles recruitment, employee relations, and benefits' },
    { code: 'DEPT002', name: 'Information Technology', description: 'Manages IT infrastructure and software development' },
    { code: 'DEPT003', name: 'Finance', description: 'Responsible for financial planning and accounting' },
    { code: 'DEPT004', name: 'Marketing', description: 'Handles marketing campaigns and brand management' },
    { code: 'DEPT005', name: 'Operations', description: 'Oversees daily business operations and logistics' },
    { code: 'DEPT006', name: 'Sales', description: 'Responsible for sales and customer acquisition' },
    { code: 'DEPT007', name: 'Research & Development', description: 'Focuses on innovation and product development' },
    { code: 'DEPT008', name: 'Customer Support', description: 'Provides customer service and technical support' },
    { code: 'DEPT009', name: 'Quality Assurance', description: 'Ensures product quality and compliance' },
    { code: 'DEPT010', name: 'Legal', description: 'Handles legal matters and compliance issues' }
  ];


  // ✅ Form + State
  showForm = false;
  deptCode = '';
  deptName = '';
  deptDescription = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
     paginatedDepartmentsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredDepartments().length / this.itemsPerPage);
  }

    get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
    const filtered = this.filteredDepartments();
    this.paginatedDepartmentsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/employees-master-data/create-new-departments']);

  }

  createDepartment() {
    if (!this.deptCode || !this.deptName || !this.deptDescription) return;

    this.departments.push({
      code: this.deptCode,
      name: this.deptName,
      description: this.deptDescription
    });

    this.hideForm();
  }

  // ✅ Edit
  editDepartment(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const dept = this.departments[index];
    this.deptCode = dept.code;
    this.deptName = dept.name;
    this.deptDescription = dept.description;
        this.router.navigate(['/panel/employees-master-data/edit-departments']);

  }

  updateDepartment() {
    if (this.editIndex === null) return;

    this.departments[this.editIndex] = {
      code: this.deptCode,
      name: this.deptName,
      description: this.deptDescription
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteDepartment(index: number) {
    this.departments.splice(index, 1);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/employees-master-data/view-all-departments']);

  }

  resetForm() {
    this.deptCode = '';
    this.deptName = '';
    this.deptDescription = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredDepartments() {
    if (!this.searchText.trim()) return this.departments;

    const searchLower = this.searchText.toLowerCase();
    return this.departments.filter(dept =>
      dept.code.toLowerCase().includes(searchLower) ||
      dept.name.toLowerCase().includes(searchLower) ||
      dept.description.toLowerCase().includes(searchLower)
    );
  }
}