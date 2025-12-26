import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-id-type',
  templateUrl: './id-type.component.html',
  styleUrls: ['./id-type.component.scss'],
})
export class IdTypeComponent {
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
        this.formTitle="Edit Id Type"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Id Type"


      }
    });
  }
  idTypes = [
    { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'NationpaginatedIdTypesal ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
     { code: 'ID001', name: 'Passport', alertDays: 30, isActive: true },
    { code: 'ID002', name: 'Driver License', alertDays: 15, isActive: false },
    { code: 'ID003', name: 'National ID', alertDays: 60, isActive: true },
    // add more dummy data as needed
  ];
   fetchIdTypes() {
    return this.idTypes;
  }

  showForm = false;
  idTypeCode = '';
  idTypeName = '';
  alertDays: number | null = null;
  isActive = true;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

    // ⭐ GLOBAL PAGINATION (same as Candidate Table)
  currentPage = 1;
  itemsPerPage = 7;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredIdTypes().length / this.itemsPerPage);
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


  paginatedIdTypes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredIdTypes().slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-id-type']);

  }

  createIdType() {
    if (!this.idTypeCode || !this.idTypeName || this.alertDays === null) return;
    this.idTypes.push({
      code: this.idTypeCode,
      name: this.idTypeName,
      alertDays: this.alertDays,
      isActive: this.isActive,
    });
    this.hideForm();
  }

  editIdType() {
        this.router.navigate(['/panel/general-master-data/edit-id-type']);

   
  }

  updateIdType() {
    if (this.editIndex === null) return;
    this.idTypes[this.editIndex] = {
      code: this.idTypeCode,
      name: this.idTypeName,
      alertDays: this.alertDays!,
      isActive: this.isActive,
    };
    this.hideForm();
  }

  deleteIdType(index: number) {
    this.idTypes.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/general-master-data/view-all-id-type']);

  }

  resetForm() {
    this.idTypeCode = '';
    this.idTypeName = '';
    this.alertDays = null;
    this.isActive = true;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  filteredIdTypes() {
    if (!this.searchText.trim()) return this.idTypes;
    return this.idTypes.filter(
      (s) =>
        s.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
