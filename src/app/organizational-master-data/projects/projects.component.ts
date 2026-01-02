import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
    title = 'view';
  formTitle=""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
          this.updatePagination();

      this.title = data['title'];
      if (this.title === 'view') {
        
        // set view mode loigc
      //  this.fetchSkills()
      }
      if  (this.title === 'edit'){
        this.formTitle="Edit Projects"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Projects"


      }
    });
  }

  // ✅ Projects Data with Status field
  projects = [
    { code: 'PR001', name: 'E-commerce Website', status: 'active' },
    { code: 'PR002', name: 'Mobile Banking App', status: 'active' },
    { code: 'PR003', name: 'Inventory Management', status: 'active' },
    { code: 'PR004', name: 'HR Management System', status: 'inactive' },
    { code: 'PR005', name: 'School Management', status: 'active' },
    { code: 'PR006', name: 'Hospital Management', status: 'active' },
    { code: 'PR007', name: 'Real Estate Portal', status: 'inactive' },
    { code: 'PR008', name: 'Food Delivery App', status: 'active' },
    { code: 'PR009', name: 'Social Media Platform', status: 'active' },
    { code: 'PR010', name: 'Fitness Tracking App', status: 'inactive' },
    { code: 'PR011', name: 'Online Learning Portal', status: 'active' },
    { code: 'PR012', name: 'Travel Booking System', status: 'active' },
    { code: 'PR013', name: 'Car Rental System', status: 'inactive' },
    { code: 'PR014', name: 'Event Management', status: 'active' },
    { code: 'PR015', name: 'Blog Platform', status: 'active' }
  ];

  // ✅ Form + State
  showForm = false;
  projectCode = '';
  projectName = '';
  projectStatus = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
     paginatedProjectsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredProjects().length / this.itemsPerPage);
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
    const filtered = this.filteredProjects();
    this.paginatedProjectsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
            this.router.navigate(['/panel/organizational-master-data/create-new-projects']);

  }

  createProject() {
    if (!this.projectCode || !this.projectName || !this.projectStatus) return;

    this.projects.push({
      code: this.projectCode,
      name: this.projectName,
      status: this.projectStatus
    });

    this.hideForm();
  }

  // ✅ Edit
  editProject() {
               this.router.navigate(['/panel/organizational-master-data/edit-projects']);

  }

  updateProject() {
    if (this.editIndex === null) return;

    this.projects[this.editIndex] = {
      code: this.projectCode,
      name: this.projectName,
      status: this.projectStatus
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteProject(index: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects.splice(index, 1);
 if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
                this.router.navigate(['/panel/organizational-master-data/view-all-projects']);

  }

  resetForm() {
    this.projectCode = '';
    this.projectName = '';
    this.projectStatus = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredProjects() {
    if (!this.searchText.trim()) return this.projects;

    const searchLower = this.searchText.toLowerCase();
    return this.projects.filter(project =>
      project.code.toLowerCase().includes(searchLower) ||
      project.name.toLowerCase().includes(searchLower)
    );
  }
}