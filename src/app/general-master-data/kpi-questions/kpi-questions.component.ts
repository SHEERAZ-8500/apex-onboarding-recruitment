import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi-questions',
  templateUrl: './kpi-questions.component.html',
  styleUrls: ['./kpi-questions.component.scss'],
})
export class KpiQuestionsComponent {

  // ✅ KPI Questions Data (EXACT same structure as skills)
  kpiQuestions = [
    { code: 'KPI001', question: 'How well did you meet project deadlines?' },
    { code: 'KPI002', question: 'Quality of work delivered?' },
    { code: 'KPI003', question: 'Team collaboration and communication?' },
    { code: 'KPI004', question: 'Client satisfaction rating?' },
    { code: 'KPI005', question: 'Adherence to company policies?' },
    { code: 'KPI006', question: 'Innovation and creativity in work?' },
    { code: 'KPI007', question: 'Problem-solving abilities?' },
    { code: 'KPI008', question: 'Time management efficiency?' },
    { code: 'KPI009', question: 'Leadership and mentorship skills?' },
    { code: 'KPI010', question: 'Technical skills improvement?' },
    { code: 'KPI011', question: 'Customer service excellence?' },
    { code: 'KPI012', question: 'Sales target achievement?' },
  ];

  // ✅ Form + State (EXACT same structure as skills)
  showForm = false;
  kpiCode = '';
  kpiQuestion = '';
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
    return Math.ceil(this.filteredKPIQuestions().length / this.itemsPerPage);
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
  paginatedKPIQuestions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredKPIQuestions().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New (EXACT same method as skills)
  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createKPIQuestion() {
    if (!this.kpiCode || !this.kpiQuestion) return;

    this.kpiQuestions.push({
      code: this.kpiCode,
      question: this.kpiQuestion
    });

    this.hideForm();
  }

  // ✅ Edit (EXACT same method as skills)
  editKPIQuestion(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    this.kpiCode = this.kpiQuestions[index].code;
    this.kpiQuestion = this.kpiQuestions[index].question;
  }

  updateKPIQuestion() {
    if (this.editIndex === null) return;

    this.kpiQuestions[this.editIndex] = {
      code: this.kpiCode,
      question: this.kpiQuestion
    };

    this.hideForm();
  }

  // ✅ Delete (EXACT same method as skills)
  deleteKPIQuestion(index: number) {
    this.kpiQuestions.splice(index, 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control (EXACT same methods as skills)
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.kpiCode = '';
    this.kpiQuestion = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter (EXACT same method as skills)
  filteredKPIQuestions() {
    if (!this.searchText.trim()) return this.kpiQuestions;

    return this.kpiQuestions.filter(item =>
      item.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.question.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}