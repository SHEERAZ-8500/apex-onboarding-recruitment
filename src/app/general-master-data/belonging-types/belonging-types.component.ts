import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-belonging-type',
  templateUrl: './belonging-types.component.html',
  styleUrls: ['./belonging-types.component.scss'],
})
export class BelongingTypesComponent {
  title = 'view';
  formTitle = ""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {

    this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Belonging Types"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Belonging Types"


      }
    });
  }

  // ✅ Belonging Types Data (5 dummy values)
  belongingTypes = [
    { code: 'BT001', name: 'Personal Items' },
    { code: 'BT002', name: 'Office Equipment' },
    { code: 'BT003', name: 'Company Vehicle' },

    { code: 'BT003', name: 'Company Vehicle' },
    { code: 'BT004', name: 'IT Equipment' },
    { code: 'BT005', name: 'Furniture' }
  ];

  fetchBelongingTypes() {
    return this.belongingTypes;
  }


  // ✅ Form + State
  showForm = false;
  belongingTypeCode = '';
  belongingTypeName = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';
    searchText2 = '';


  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
  paginatedBelongingTypesList: any[] = [];
  

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredBelongingTypes().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ✅ Pagination Data


  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedBelongingTypesList = this.belongingTypes.slice(start, end);

  }

  onItemsPerChange(event: any) {
    let value = event.target.value
    this.currentPage = 1
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/general-master-data/create-new-belonging-types']);

  }

  createBelongingType() {
    if (!this.belongingTypeCode || !this.belongingTypeName) return;

    this.belongingTypes.push({
      code: this.belongingTypeCode,
      name: this.belongingTypeName,
    });

    this.hideForm();
  }

  // ✅ Edit
  editBelongingType() {
    this.router.navigate(['/panel/general-master-data/edit-belonging-types']);
  }


  onSearch() {
    let filter = this.belongingTypes.filter((items) => items.name.toLowerCase().includes(this.searchText2.toLowerCase()));
    this.paginatedBelongingTypesList = filter 
    this.updatePagination();
  }


  updateBelongingType() {
    if (this.editIndex === null) return;

    this.belongingTypes[this.editIndex] = {
      code: this.belongingTypeCode,
      name: this.belongingTypeName,
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteBelongingType(index: number) {
    this.belongingTypes.splice(index, 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
    this.router.navigate(['/panel/general-master-data/view-all-belonging-types']);
  }

  resetForm() {
    this.belongingTypeCode = '';
    this.belongingTypeName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredBelongingTypes() {
    if (!this.searchText.trim()) return this.belongingTypes;

    return this.belongingTypes.filter(type =>
      type.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      type.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}