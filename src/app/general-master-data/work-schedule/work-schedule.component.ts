import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface WorkSchedule {
  year: number;
  month: string;
  days?: ScheduleDay[];
}

interface ScheduleDay {
  date: string;
  day: string;
  A?: string;
  B?: string;
  C?: string;
  D?: string;
}

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.scss']
})
export class WorkScheduleComponent implements OnInit {
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
        this.formTitle="Edit Work Schedule"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Work Schedule"


      }
    });
  }
  // ✅ Work Schedules Data
  workSchedules: WorkSchedule[] = [
    { year: 2024, month: 'September' },
    { year: 2024, month: 'December' },
    { year: 2025, month: 'January' },
    { year: 2025, month: 'March' },
    { year: 2025, month: 'June' },
    { year: 2026, month: 'February' },
    { year: 2026, month: 'April' },
    { year: 2026, month: 'July' },
    { year: 2026, month: 'October' }
  ];
   fetchWorkSchedule() {
    return this.workSchedules;
  }

  // ✅ Form + State
  showForm = false;
  selectedYear: number | null = null;
  selectedMonth: string = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Popup State
  showPopup = false;
  selectedSchedule: WorkSchedule | null = null;
  scheduleDays: ScheduleDay[] = [];

  // ✅ Dropdown Data
  years: number[] = [];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;

  

  // ✅ Generate years from 2025 onwards
  generateYearDropdown() {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
    const endYear = currentYear + 10;
    
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  // ✅ Pagination Methods
  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredSchedules().length / this.itemsPerPage);
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

  paginatedSchedules() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredSchedules().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Filter Schedules
  filteredSchedules() {
    if (!this.searchText.trim()) return this.workSchedules;

    return this.workSchedules.filter(schedule =>
      schedule.year.toString().includes(this.searchText) ||
      schedule.month.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // ✅ Add New Schedule
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-work-schedule']);

  }

  createSchedule() {
    if (!this.selectedYear || !this.selectedMonth) return;

    // Check if schedule already exists
    const exists = this.workSchedules.some(
      s => s.year === this.selectedYear && s.month === this.selectedMonth
    );

    if (exists) {
      alert('Schedule for this year and month already exists!');
      return;
    }

    this.workSchedules.push({
      year: this.selectedYear,
      month: this.selectedMonth
    });

    this.hideForm();
  }

  // ✅ Edit Schedule
  editSchedule() {
          this.router.navigate(['/panel/general-master-data/edit-work-schedule']);

  }

  updateSchedule() {
    if (this.editIndex === null || !this.selectedYear || !this.selectedMonth) return;

    this.workSchedules[this.editIndex] = {
      year: this.selectedYear,
      month: this.selectedMonth
    };

    this.hideForm();
  }

  // ✅ Delete Schedule
  deleteSchedule(index: number) {
    if (confirm('Are you sure you want to delete this schedule?')) {
      this.workSchedules.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ View Schedule (Popup)
  viewSchedule(index: number) {
    this.selectedSchedule = this.workSchedules[index];
    this.generateScheduleDays();
    this.showPopup = true;
  }

  // ✅ Generate dummy schedule days for popup
  generateScheduleDays() {
    if (!this.selectedSchedule) return;

    this.scheduleDays = [];
    const monthIndex = this.months.indexOf(this.selectedSchedule.month);
    const year = this.selectedSchedule.year;
    
    // Get number of days in month
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    for (let day = 1; day <= 20; day++) { // Showing first 20 days as in your screenshot
      const date = new Date(year, monthIndex, day);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Generate random shifts (M, O, or empty)
      const shifts = ['M', 'O', ''];
      const randomShift = shifts[Math.floor(Math.random() * shifts.length)];
      
      this.scheduleDays.push({
        date: `${this.selectedSchedule!.month.substring(0, 3)} ${day}, ${year}`,
        day: dayName,
        A: randomShift,
        B: day % 7 === 0 ? 'M' : '', // Some pattern
        C: day % 5 === 0 ? 'O' : '',
        D: day % 3 === 0 ? 'M' : ''
      });
    }
  }

  // ✅ Close Popup
  closePopup() {
    this.showPopup = false;
    this.selectedSchedule = null;
    this.scheduleDays = [];
  }

  // ✅ Form Control Methods
  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/general-master-data/view-all-work-schedule']);

  }

  resetForm() {
    this.selectedYear = null;
    this.selectedMonth = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }
}