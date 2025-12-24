import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  title = 'view';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        // set view mode loigc
      //  this.fetchSkills()
      }else{

      }
    });
  }
  // ✅ Skills Data (cleaned duplicates)
  skills = [
    { code: 'SK001', name: 'HTML' },
    { code: 'SK002', name: 'CSS' },
    { code: 'SK003', name: 'JavaScript' },

    { code: 'SK003', name: 'JavaScript' },
    { code: 'SK004', name: 'Angular' },
    { code: 'SK005', name: 'WordPress' },
    { code: 'SK006', name: 'PHP' },
    { code: 'SK007', name: 'Bootstrap' },
    { code: 'SK008', name: 'UI Design' }, { code: 'SK001', name: 'HTML' },
    { code: 'SK002', name: 'CSS' },
    { code: 'SK003', name: 'JavaScript' },
    { code: 'SK004', name: 'Angular' },

    { code: 'SK006', name: 'PHP' },
    { code: 'SK007', name: 'Bootstrap' },
    { code: 'SK008', name: 'UI Design' },
    { code: 'SK009', name: 'Git' }
  ];

  fetchSkills() {
    return this.skills;
  }

  // ✅ Form + State
  showForm = false;
  skillCode = '';
  skillName = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';
  skillRemarks = '';
  skillLevel = ''
  skillActive = true;

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
  skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredSkills().length / this.itemsPerPage);
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

  // ✅ Pagination Data
  paginatedSkills() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredSkills().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/general-master-data/create-new-skill']);
  }

  createSkill() {
    if (!this.skillCode || !this.skillName) return;

    this.skills.push({
      code: this.skillCode,
      name: this.skillName,
    });

    this.hideForm();
  }

  // ✅ Edit
  editSkill(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    this.skillCode = this.skills[index].code;
    this.skillName = this.skills[index].name;
  }

  updateSkill() {
    if (this.editIndex === null) return;

    this.skills[this.editIndex] = {
      code: this.skillCode,
      name: this.skillName,
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteSkill(index: number) {
    this.skills.splice(index, 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control
  cancelForm() {
    // this.hideForm();
    this.router.navigate(['/panel/general-master-data/view-all-skills']);
  }

  resetForm() {
    this.skillCode = '';
    this.skillName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredSkills() {
    if (!this.searchText.trim()) return this.skills;

    return this.skills.filter(skill =>
      skill.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      skill.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
