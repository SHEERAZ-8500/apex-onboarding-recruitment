import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ramadan-timings',
  templateUrl: './ramadan-timing.component.html',
  styleUrls: ['./ramadan-timing.component.scss'],
})
export class RamadanTimingComponent {
  title = 'view';
  formTitle = "";
  
  ramadanList = [
    { name: 'Ramadan', islamicYear: '1446', currentYear: 2025, startDate: '2025-03-12', endDate: '2025-04-10' },
    { name: 'Ramadan', islamicYear: '1447', currentYear: 2026, startDate: '2026-03-02', endDate: '2026-03-31' }
  ];
  
  showForm = false;
  name = '';
  islamicYear = '';
  currentYear: number | null = null;
  startDate: string = '';
  endDate: string = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';
  
  currentPage = 1;
  itemsPerPage = 7;
  
  // Gregorian years dropdown
  gregorianYears: number[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
    // Initialize gregorianYears array
    const start = 2025;
    const end = 2035;
    for (let y = start; y <= end; y++) this.gregorianYears.push(y);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        // set view mode logic
        // this.fetchRamadanList();
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Ramadan Timings";
      }
      if (this.title === 'create') {
        this.formTitle = "Create New Ramadan Timings";
      }
    });
  }

  fetchRamadanList() {
    return this.ramadanList;
  }

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredRamadan().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    const total = this.totalPages;
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    if (this.currentPage === 1) return [1, 2, 3];
    if (this.currentPage === total) return [total - 2, total - 1, total];
    return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
  }

  paginatedRamadan() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRamadan().slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/general-master-data/create-new-ramadan-timing']);
  }

  createRamadan() {
    if (!this.name || !this.islamicYear || !this.currentYear || !this.startDate || !this.endDate) return;
    this.ramadanList.push({
      name: this.name,
      islamicYear: this.islamicYear,
      currentYear: this.currentYear,
      startDate: this.startDate,
      endDate: this.endDate,
    });
    this.hideForm();
  }

  editRamadan() {
    this.router.navigate(['/panel/general-master-data/edit-ramadan-timing']);
  }

  updateRamadan() {
    if (this.editIndex === null) return;
    this.ramadanList[this.editIndex] = {
      name: this.name,
      islamicYear: this.islamicYear,
      currentYear: this.currentYear!,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.hideForm();
  }

  deleteRamadan(index: number) {
    this.ramadanList.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() {
    this.hideForm();
    this.router.navigate(['/panel/general-master-data/view-all-ramadan-timing']);
  }

  resetForm() {
    this.name = '';
    this.islamicYear = '';
    this.currentYear = null;
    this.startDate = '';
    this.endDate = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  filteredRamadan() {
    if (!this.searchText.trim()) return this.ramadanList;
    return this.ramadanList.filter(
      s =>
        s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.islamicYear.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}