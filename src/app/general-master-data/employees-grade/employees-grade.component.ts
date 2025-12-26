import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employee-grade',
  templateUrl: './employees-grade.component.html',
  styleUrls: ['./employees-grade.component.scss'],
})
export class EmployeesGradeComponent {
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
        this.formTitle="Edit Employee Grade"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Employee Grade"


      }
    });
  }

  // ✅ Employee Grades Data (EXACT same structure as skills)
  employeeGrades = [
    { code: 'EG001', grade: 'Grade A' },
    { code: 'EG002', grade: 'Grade B' },
    { code: 'EG003', grade: 'Grade C' },
    { code: 'EG004', grade: 'Grade D' },
    { code: 'EG005', grade: 'Senior Manager' },
    { code: 'EG006', grade: 'Manager' },
    { code: 'EG007', grade: 'Assistant Manager' },
    { code: 'EG008', grade: 'Supervisor' },
    { code: 'EG009', grade: 'Executive' },
    { code: 'EG010', grade: 'Trainee' },
    { code: 'EG011', grade: 'Intern' },
    { code: 'EG012', grade: 'Director' },
  ];
   fetchSkills() {
    return this.employeeGrades;
  }

  // ✅ Form + State (EXACT same structure as skills)
  showForm = false;
  gradeCode = '';
  employeeGrade = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination (EXACT same structure as skills)
  currentPage = 1;
  itemsPerPage = 8;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployeeGrades().length / this.itemsPerPage);
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

  // ✅ Pagination Data (EXACT same method as skills)
  paginatedEmployeeGrades() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployeeGrades().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New (EXACT same method as skills)
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-employees-grade']);


  }

  createEmployeeGrade() {
    if (!this.gradeCode || !this.employeeGrade) return;

    this.employeeGrades.push({
      code: this.gradeCode,
      grade: this.employeeGrade
    });

    this.hideForm();
  }

  // ✅ Edit (EXACT same method as skills)
  editEmployeeGrade() {
        this.router.navigate(['/panel/general-master-data/edit-employees-grade']);

  }

  updateEmployeeGrade() {
    if (this.editIndex === null) return;

    this.employeeGrades[this.editIndex] = {
      code: this.gradeCode,
      grade: this.employeeGrade
    };

    this.hideForm();
  }

  // ✅ Delete (EXACT same method as skills)
  deleteEmployeeGrade(index: number) {
    this.employeeGrades.splice(index, 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control (EXACT same methods as skills)
  cancelForm() {
    this.hideForm();
            this.router.navigate(['/panel/general-master-data/view-all-employees-grade']);

  }

  resetForm() {
    this.gradeCode = '';
    this.employeeGrade = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter (EXACT same method as skills)
  filteredEmployeeGrades() {
    if (!this.searchText.trim()) return this.employeeGrades;

    return this.employeeGrades.filter(item =>
      item.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.grade.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}