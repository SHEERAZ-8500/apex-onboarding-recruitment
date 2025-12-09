import { Component } from '@angular/core';

@Component({
  selector: 'app-time-type',
  templateUrl: './time-type.component.html',
  styleUrls: ['./time-type.component.scss'],
})
export class TimeTypeComponent {

  // ✅ Time Options
  hours = Array.from({ length: 12 }, (_, i) => i + 1);
  minutes = Array.from({ length: 60 }, (_, i) => i);

  // ✅ Dropdown Options
  dropdownOptions = {
    weekOffOptions: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'No Week Off',
      'Alternate Saturday',
      '2nd & 4th Saturday'
    ],
    
    workScheduleOptions: [
      '5 Days Week',
      '6 Days Week',
      '7 Days Week',
      'Flexible Hours',
      'Shift Rotation',
      'Fixed Shift',
      'Split Shift',
      'Compressed Week',
      'Annualized Hours',
      'On-call Schedule'
    ]
  };

  // ✅ Time Types Data
  timeTypes = [
    {
      code: 'TT001',
      description: 'Regular Office Hours',
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      breakHours: 1,
      weekOff: 'Sunday',
      workSchedule: '5 Days Week'
    },
    {
      code: 'TT002',
      description: 'Night Shift',
      startTime: '10:00 PM',
      endTime: '06:00 AM',
      breakHours: 1.5,
      weekOff: 'Monday',
      workSchedule: '6 Days Week'
    },
    {
      code: 'TT003',
      description: 'Morning Shift',
      startTime: '06:00 AM',
      endTime: '02:00 PM',
      breakHours: 0.5,
      weekOff: 'Saturday',
      workSchedule: '5 Days Week'
    },
    {
      code: 'TT004',
      description: 'Evening Shift',
      startTime: '02:00 PM',
      endTime: '10:00 PM',
      breakHours: 1,
      weekOff: 'Sunday',
      workSchedule: '6 Days Week'
    },
    {
      code: 'TT005',
      description: 'Flexible Hours',
      startTime: '08:00 AM',
      endTime: '05:00 PM',
      breakHours: 1,
      weekOff: 'No Week Off',
      workSchedule: 'Flexible Hours'
    }
  ];

  // ✅ Form Fields
  timeTypeCode = '';
  timeTypeDescription = '';
  
  // Time Fields
  startTimeHour: string = '';
  startTimeMinute: string = '';
  startTimePeriod: string = 'AM';
  
  endTimeHour: string = '';
  endTimeMinute: string = '';
  endTimePeriod: string = 'PM';
  
  breakHours: number | null = null;
  weekdaysOff = '';
  workSchedule = '';

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
    return Math.ceil(this.filteredTimeTypes().length / this.itemsPerPage);
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

  // ✅ Time Methods
  formatTime(hour: string, minute: string, period: string): string {
    if (!hour || !minute) return '';
    const hourStr = hour.padStart(2, '0');
    const minuteStr = minute.padStart(2, '0');
    return `${hourStr}:${minuteStr} ${period}`;
  }

  getFormattedStartTime(): string {
    return this.formatTime(this.startTimeHour, this.startTimeMinute, this.startTimePeriod);
  }

  getFormattedEndTime(): string {
    return this.formatTime(this.endTimeHour, this.endTimeMinute, this.endTimePeriod);
  }

  isTimeValid(): boolean {
    return !!(this.startTimeHour && this.startTimeMinute && this.endTimeHour && this.endTimeMinute);
  }

  calculateTotalHours(): number {
    if (!this.isTimeValid()) return 0;
    
    let startHour = parseInt(this.startTimeHour);
    let endHour = parseInt(this.endTimeHour);
    
    // Convert to 24-hour format for calculation
    if (this.startTimePeriod === 'PM' && startHour < 12) startHour += 12;
    if (this.endTimePeriod === 'PM' && endHour < 12) endHour += 12;
    if (this.startTimePeriod === 'AM' && startHour === 12) startHour = 0;
    if (this.endTimePeriod === 'AM' && endHour === 12) endHour = 0;
    
    const startMinutes = parseInt(this.startTimeMinute);
    const endMinutes = parseInt(this.endTimeMinute);
    
    let totalMinutes = (endHour * 60 + endMinutes) - (startHour * 60 + startMinutes);
    
    // Handle overnight shifts
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    
    return totalMinutes / 60;
  }

  calculateNetHours(): number {
    const totalHours = this.calculateTotalHours();
    const breakHrs = this.breakHours || 0;
    return Math.max(0, totalHours - breakHrs);
  }

  formatTimeSummary(): string {
    if (!this.isTimeValid()) return '';
    return `${this.getFormattedStartTime()} - ${this.getFormattedEndTime()}`;
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.timeTypeCode &&
      this.timeTypeDescription &&
      this.startTimeHour &&
      this.startTimeMinute &&
      this.endTimeHour &&
      this.endTimeMinute &&
      this.breakHours !== null && this.breakHours >= 0 &&
      this.weekdaysOff &&
      this.workSchedule
    );
  }

  // ✅ Pagination Data
  paginatedTimeTypes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTimeTypes().slice(start, start + this.itemsPerPage);
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

  createTimeType() {
    if (!this.isFormValid()) return;

    this.timeTypes.push({
      code: this.timeTypeCode,
      description: this.timeTypeDescription,
      startTime: this.getFormattedStartTime(),
      endTime: this.getFormattedEndTime(),
      breakHours: this.breakHours || 0,
      weekOff: this.weekdaysOff,
      workSchedule: this.workSchedule
    });

    this.hideForm();
  }

  // ✅ Edit
  editTimeType(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const timeType = this.timeTypes[index];
    this.timeTypeCode = timeType.code;
    this.timeTypeDescription = timeType.description;
    
    // Parse start time
    const startMatch = timeType.startTime.match(/(\d+):(\d+)\s+(AM|PM)/);
    if (startMatch) {
      this.startTimeHour = parseInt(startMatch[1]).toString();
      this.startTimeMinute = startMatch[2];
      this.startTimePeriod = startMatch[3];
    }
    
    // Parse end time
    const endMatch = timeType.endTime.match(/(\d+):(\d+)\s+(AM|PM)/);
    if (endMatch) {
      this.endTimeHour = parseInt(endMatch[1]).toString();
      this.endTimeMinute = endMatch[2];
      this.endTimePeriod = endMatch[3];
    }
    
    this.breakHours = timeType.breakHours;
    this.weekdaysOff = timeType.weekOff;
    this.workSchedule = timeType.workSchedule;
  }

  updateTimeType() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.timeTypes[this.editIndex] = {
      code: this.timeTypeCode,
      description: this.timeTypeDescription,
      startTime: this.getFormattedStartTime(),
      endTime: this.getFormattedEndTime(),
      breakHours: this.breakHours || 0,
      weekOff: this.weekdaysOff,
      workSchedule: this.workSchedule
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteTimeType(index: number) {
    if (confirm('Are you sure you want to delete this time type?')) {
      this.timeTypes.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Table Dropdown Change Handlers
  onTableWeekOffChange(item: any, event: any) {
    item.weekOff = event.target.value;
  }

  onTableWorkScheduleChange(item: any, event: any) {
    item.workSchedule = event.target.value;
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.timeTypeCode = '';
    this.timeTypeDescription = '';
    this.startTimeHour = '';
    this.startTimeMinute = '';
    this.startTimePeriod = 'AM';
    this.endTimeHour = '';
    this.endTimeMinute = '';
    this.endTimePeriod = 'PM';
    this.breakHours = null;
    this.weekdaysOff = '';
    this.workSchedule = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredTimeTypes() {
    if (!this.searchText.trim()) return this.timeTypes;

    const searchLower = this.searchText.toLowerCase();
    return this.timeTypes.filter(timeType =>
      timeType.code.toLowerCase().includes(searchLower) ||
      timeType.description.toLowerCase().includes(searchLower) ||
      timeType.startTime.toLowerCase().includes(searchLower) ||
      timeType.endTime.toLowerCase().includes(searchLower) ||
      timeType.weekOff.toLowerCase().includes(searchLower) ||
      timeType.workSchedule.toLowerCase().includes(searchLower)
    );
  }
}