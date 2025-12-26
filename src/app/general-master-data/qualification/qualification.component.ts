import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss'],
})
export class QualificationComponent {
  title = 'view';
  formTitle=""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        
        // set view mode loigc
      //  this.fetchSkills()
      }
      if  (this.title === 'edit'){
        this.formTitle="Edit Qualification"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Qualification"


      }
    });
  }

  qualification = [
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'qualification 4' },
    { code: 'SK014', name: 'qualification 5' },
    { code: 'SK015', name: 'qualification 6' },
     { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'qualification 4' },
    { code: 'SK014', name: 'qualification 5' },
    { code: 'SK015', name: 'qualification 6' },
     { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'qualification 4' },
    { code: 'SK014', name: 'qualification 5' },
    { code: 'SK015', name: 'qualification 6' },
     { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'qualification 4' },
    { code: 'SK014', name: 'qualification 5' },
    { code: 'SK015', name: 'qualification 6' },
     { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'qualification 4' },
    { code: 'SK014', name: 'qualification 5' },
    { code: 'SK015', name: 'qualification 6' },
     { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'qualification 4' },
    { code: 'SK014', name: 'qualification 5' },
    { code: 'SK015', name: 'qualification 6' },
    { code: 'SK016', name: 'qualification 7' }
  ];

   fetchQualification() {
    return this.qualification;
  }

  showForm = false;
  qualificationCode: string = '';
  qualificationName: string = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';
  qualificationMajor: string = '';
  passingYear: string = '';
  grade: string = '';
  institute: string = '';
  active: boolean = true;

  // ⭐ GLOBAL PAGINATION (same as Candidate Table)
  currentPage = 1;
  itemsPerPage = 7;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredQualification().length / this.itemsPerPage);
  }

  get totalPagesArray() {
  const total = this.totalPages;

  if (total <= 3) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Always show only 3 pages
  if (this.currentPage === 1) return [1, 2, 3];
  if (this.currentPage === total) return [total - 2,total - 1, total];

  return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
}


  paginatedQualification() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredQualification().slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ⭐ Show form as a dedicated page
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-qualification']);

  }

  createqualification() {
    if (!this.qualificationCode || !this.qualificationName) return;
    this.qualification.push({ code: this.qualificationCode, name: this.qualificationName });
    this.hideForm();
  }

  editqualification() {
        this.router.navigate(['/panel/general-master-data/edit-qualification']);

  }

  updatequalification() {
    if (this.editIndex === null) return;
    this.qualification[this.editIndex] = {
      code: this.qualificationCode,
      name: this.qualificationName,
    };
    this.hideForm();
  }

  deletequalification(index: number) {
    this.qualification.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/general-master-data/view-all-qualification']);

  }

  resetForm() {
    this.qualificationCode = '';
    this.qualificationName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  filteredQualification() {
    if (!this.searchText.trim()) return this.qualification;
    return this.qualification.filter(
      (s) =>
        s.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
