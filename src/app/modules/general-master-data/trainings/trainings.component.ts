import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
})
export class TrainingsComponent {
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
        this.formTitle="Edit Trainings"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Trainings"


      }
    });
  }
  trainings = [
    { code: 'T001', name: 'Angular Basics', provider: 'ABC Training', duration: 3, createdBy: 'Admin' },
    { code: 'T002', name: 'React Advanced', provider: 'XYZ Training', duration: 5, createdBy: 'Admin' }
  ];

  showForm = false;
  code = '';
  name = '';
  provider = '';
  duration: number | null = null;
  createdBy = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  currentPage = 1;
  itemsPerPage = 7;
     paginatedTrainingsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredTrainings().length / this.itemsPerPage);
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
    const filtered = this.filteredTrainings();
    this.paginatedTrainingsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }


  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/general-master-data/create-new-trainings']);

  }

  createTraining() {
    if (!this.code || !this.name || !this.provider || this.duration === null || !this.createdBy) return;
    this.trainings.push({
      code: this.code,
      name: this.name,
      provider: this.provider,
      duration: this.duration,
      createdBy: this.createdBy,
    });
    this.hideForm();
  }

  editTraining() {
         this.router.navigate(['/panel/general-master-data/edit-trainings']);

  }

  updateTraining() {
    if (this.editIndex === null) return;
    this.trainings[this.editIndex] = {
      code: this.code,
      name: this.name,
      provider: this.provider,
      duration: this.duration!,
      createdBy: this.createdBy,
    };
    this.hideForm();
  }

  deleteTraining(index: number) {
    this.trainings.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
  if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }

  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/general-master-data/view-all-trainings']);

  }

  resetForm() {
    this.code = '';
    this.name = '';
    this.provider = '';
    this.duration = null;
    this.createdBy = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  filteredTrainings() {
    if (!this.searchText.trim()) return this.trainings;
    return this.trainings.filter(
      s =>
        s.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
