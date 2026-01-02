import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-kpi-questions',
  templateUrl: './kpi-questions.component.html',
  styleUrls: ['./kpi-questions.component.scss'],
})
export class KpiQuestionsComponent {
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
        this.formTitle="Edit KPI Question"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New KPI Question"


      }
    });
  }
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
     paginatedKPIQuestionsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredKPIQuestions().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }



  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }


      updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredKPIQuestions();
    this.paginatedKPIQuestionsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New (EXACT same method as skills)
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-kpi-questions']);

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
  editKPIQuestion() {
        this.router.navigate(['/panel/general-master-data/edit-kpi-questions']);

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

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }

  // ✅ Form Control (EXACT same methods as skills)
  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/general-master-data/view-all-kpi-questions']);

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