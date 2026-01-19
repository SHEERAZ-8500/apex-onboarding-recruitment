import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss'],
})
export class JobTitleComponent {

   title = 'view';
  formTitle=""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
          this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        
        // set view mode loigc
      //  this.fetchSkills()
      }
      if  (this.title === 'edit'){
        this.formTitle="Edit Job Title"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Job Title"


      }
    });
  }

  
  // ✅ Job Titles Data (EXACT same structure as skills)
  jobTitles = [
    { code: 'JT001', title: 'Software Developer', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT002', title: 'Project Manager', workingHours: 9, trainingRequired: 'required' },
    { code: 'JT003', title: 'UI/UX Designer', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT004', title: 'Quality Analyst', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT005', title: 'System Administrator', workingHours: 9, trainingRequired: 'not required' },
    { code: 'JT006', title: 'Database Administrator', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT007', title: 'Network Engineer', workingHours: 9, trainingRequired: 'required' },
    { code: 'JT008', title: 'DevOps Engineer', workingHours: 8, trainingRequired: 'required' },
    { code: 'JT009', title: 'Business Analyst', workingHours: 8, trainingRequired: 'not required' },
    { code: 'JT010', title: 'Technical Writer', workingHours: 7, trainingRequired: 'not required' },
  ];



  // ✅ Form + State (EXACT same structure as skills)
  showForm = false;
  jobTitleCode = '';
  jobTitle = '';
  workingHours = '';
  trainingRequired = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination (EXACT same structure as skills)
  currentPage = 1;
  itemsPerPage = 8;
     paginatedJobTitlesList: any[] = [];



  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredJobTitles().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ✅ Pagination Data (EXACT same method as skills)
 

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }

    updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredJobTitles();
    this.paginatedJobTitlesList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }


  // ✅ Add New (EXACT same method as skills)
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-job-title']);

  }

  createJobTitle() {
    if (!this.jobTitleCode || !this.jobTitle || !this.workingHours || !this.trainingRequired) return;

    this.jobTitles.push({
      code: this.jobTitleCode,
      title: this.jobTitle,
      workingHours: parseInt(this.workingHours),
      trainingRequired: this.trainingRequired
    });

    this.hideForm();
  }

  // ✅ Edit (EXACT same method as skills)
  editJobTitle() {
        this.router.navigate(['/panel/general-master-data/edit-job-title']);

  }

  updateJobTitle() {
    if (this.editIndex === null) return;

    this.jobTitles[this.editIndex] = {
      code: this.jobTitleCode,
      title: this.jobTitle,
      workingHours: parseInt(this.workingHours),
      trainingRequired: this.trainingRequired
    };

    this.hideForm();
  }

  // ✅ Delete (EXACT same method as skills)
  deleteJobTitle(index: number) {
    this.jobTitles.splice(index, 1);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }

  // ✅ Form Control (EXACT same methods as skills)
  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/general-master-data/view-all-job-title']);

  }

  resetForm() {
    this.jobTitleCode = '';
    this.jobTitle = '';
    this.workingHours = '';
    this.trainingRequired = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter (EXACT same method as skills)
  filteredJobTitles() {
    if (!this.searchText.trim()) return this.jobTitles;

    return this.jobTitles.filter(jobTitle =>
      jobTitle.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jobTitle.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jobTitle.trainingRequired.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jobTitle.workingHours.toString().includes(this.searchText.toLowerCase())
    );
  }
}