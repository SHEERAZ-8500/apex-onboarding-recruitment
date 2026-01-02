import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pre-requisites',
  templateUrl: './pre-requisites.component.html',
  styleUrls: ['./pre-requisites.component.scss']
})
export class PreRequisitesComponent {
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
        this.formTitle="Edit Pre Requisites"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Pre Requisites"


      }
    });
  }

  // ---------- Dummy Data ----------
  prereqList = [
    { name: 'Requirement A', isActive: true },
    { name: 'Requirement B', isActive: false },
    { name: 'Requirement C', isActive: true },
    { name: 'Requirement D', isActive: false },
    { name: 'Requirement E', isActive: true }
  ];

  // ---------- Form Fields ----------
  name: string = '';
  isActive: boolean = true;

  // ---------- UI State ----------
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;

  // ---------- Search ----------
  searchText: string = '';

  // ---------- Pagination ----------
  currentPage: number = 1;
  itemsPerPage: number = 5;
     paginatedPrereqsList: any[] = [];



  // -------------------------
  // Pagination Helpers
  // -------------------------
  get totalPages(): number {
    return Math.ceil(this.filteredPrereqs().length / this.itemsPerPage);
  }

   get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get currentPageStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }



  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
          this.updatePagination();

    }
  }

      updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredPrereqs();
    this.paginatedPrereqsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // -------------------------
  // SEARCH
  // -------------------------
  filteredPrereqs() {
    if (!this.searchText) return this.prereqList;

    return this.prereqList.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // -------------------------
  // CREATE NEW
  // -------------------------
  onNew() {
    this.showForm = true;
    this.isEdit = false;
    this.resetForm();
        this.router.navigate(['/panel/general-master-data/create-new-pre-requisites']);

  }

  createPrereq() {
    const newItem = {
      name: this.name,
      isActive: this.isActive
    };

    this.prereqList.push(newItem);
    this.cancelForm();
  }

  // -------------------------
  // EDIT
  // -------------------------
  editPrereq() {
       this.router.navigate(['/panel/general-master-data/edit-pre-requisites']);

  }

  updatePrereq() {
    if (this.editIndex !== null) {
      this.prereqList[this.editIndex] = {
        name: this.name,
        isActive: this.isActive
      };
    }
    this.cancelForm();
  }

  // -------------------------
  // DELETE
  // -------------------------
  deletePrereq(index: number) {
    this.prereqList.splice(index, 1);
     if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  

  // -------------------------
  // FORM RESET & CANCEL
  // -------------------------
  cancelForm() {
    this.showForm = false;
    this.isEdit = false;
    this.editIndex = null;
    this.resetForm();
        this.router.navigate(['/panel/general-master-data/view-all-pre-requisites']);

  }

  resetForm() {
    this.name = '';
    this.isActive = true;
  }
}
