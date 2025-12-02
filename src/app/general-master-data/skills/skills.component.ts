import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills = [
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'Skill 4' },
    { code: 'SK014', name: 'Skill 5' },
    { code: 'SK015', name: 'Skill 6' },
    { code: 'SK016', name: 'Skill 7' },
    { code: 'SK017', name: 'Skill 8' },
    { code: 'SK018', name: 'Skill 9' },
    { code: 'SK019', name: 'Skill 10' },
    { code: 'SK020', name: 'Skill 11' },
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'Skill 4' },
    { code: 'SK014', name: 'Skill 5' },
    { code: 'SK015', name: 'Skill 6' },
    { code: 'SK016', name: 'Skill 7' },
    { code: 'SK017', name: 'Skill 8' },
    { code: 'SK018', name: 'Skill 9' },
    { code: 'SK019', name: 'Skill 10' },
    { code: 'SK020', name: 'Skill 11' },
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'Skill 4' },
    { code: 'SK014', name: 'Skill 5' },
    { code: 'SK015', name: 'Skill 6' },
    { code: 'SK016', name: 'Skill 7' },
    { code: 'SK017', name: 'Skill 8' },
    { code: 'SK018', name: 'Skill 9' },
    { code: 'SK019', name: 'Skill 10' },
    { code: 'SK020', name: 'Skill 11' },
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'Skill 4' },
    { code: 'SK014', name: 'Skill 5' },
    { code: 'SK015', name: 'Skill 6' },
    { code: 'SK016', name: 'Skill 7' },
    { code: 'SK017', name: 'Skill 8' },
    { code: 'SK018', name: 'Skill 9' },
    { code: 'SK019', name: 'Skill 10' },
    { code: 'SK020', name: 'Skill 11' },
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'Skill 4' },
    { code: 'SK014', name: 'Skill 5' },
    { code: 'SK015', name: 'Skill 6' },
    { code: 'SK016', name: 'Skill 7' },
    { code: 'SK017', name: 'Skill 8' },
    { code: 'SK018', name: 'Skill 9' },
    { code: 'SK019', name: 'Skill 10' },
    { code: 'SK020', name: 'Skill 11' },
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'Skill 4' },
    { code: 'SK014', name: 'Skill 5' },
    { code: 'SK015', name: 'Skill 6' },
    { code: 'SK016', name: 'Skill 7' },
    { code: 'SK017', name: 'Skill 8' },
    { code: 'SK018', name: 'Skill 9' },
    { code: 'SK019', name: 'Skill 10' },
    { code: 'SK020', name: 'Skill 11' },
    { code: 'SK008', name: 'IT Professional' },
    { code: 'SK011', name: '1213' },
    { code: 'SK012', name: '121' },
    { code: 'SK013', name: 'Skill 4' },
    { code: 'SK014', name: 'Skill 5' },
    { code: 'SK015', name: 'Skill 6' },
    { code: 'SK016', name: 'Skill 7' },
    { code: 'SK017', name: 'Skill 8' },
    { code: 'SK018', name: 'Skill 9' },
    { code: 'SK019', name: 'Skill 10' },
    { code: 'SK020', name: 'Skill 11' },
    { code: 'SK021', name: 'Skill 12' },
  ];

  showForm = false;
  skillCode: string = '';
  skillName: string = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // Pagination
  currentPage = 1;
  pageSize = 8; // show 7 rows per page

  get currentPageStart() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get totalPages() {
    return Math.ceil(this.filteredSkills().length / this.pageSize);
  }

  totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  paginatedSkills() {
    return this.filteredSkills().slice(
      this.currentPageStart,
      this.currentPageStart + this.pageSize
    );
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  // ✅ NEW: Only show 2 page numbers at a time
  visiblePages() {
    let pages = [];
    if (this.totalPages <= 2) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.currentPage === 1) pages = [1, 2];
      else
        pages = [
          this.currentPage,
          Math.min(this.currentPage + 1, this.totalPages),
        ];
    }
    return pages;
  }

  // ⭐ Show form as a dedicated "page"
  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createSkill() {
    if (!this.skillCode || !this.skillName) return;
    this.skills.push({ code: this.skillCode, name: this.skillName });
    this.hideForm();
  }

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

  deleteSkill(index: number) {
    this.skills.splice(index, 1);
    if (this.editIndex === index) this.hideForm();
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  cancelForm() {
    this.hideForm();
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

  filteredSkills() {
    if (!this.searchText.trim()) return this.skills;
    return this.skills.filter(
      (s) =>
        s.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
