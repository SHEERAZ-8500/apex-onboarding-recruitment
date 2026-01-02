import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-gosiid',
  templateUrl: './gosiid.component.html',
  styleUrls: ['./gosiid.component.scss'],
})
export class GOSIIDComponent {

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
        this.formTitle = "Edit Gosiid"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Gosiid"


      }
    });
  }

  // ✅ Data (with your required fields: code and name)
  items = [
    { code: 'GO001', name: 'Item One' },
    { code: 'GO002', name: 'Item Two' },
    { code: 'GO003', name: 'Item Three' },
    { code: 'GO004', name: 'Item Four' },
    { code: 'GO005', name: 'Item Five' },
    { code: 'GO006', name: 'Item Six' },
    { code: 'GO007', name: 'Item Seven' },
    { code: 'GO008', name: 'Item Eight' },
    { code: 'GO009', name: 'Item Nine' },
    { code: 'GO010', name: 'Item Ten' }
  ];


  // ✅ Form + State
  showForm = false;
  itemCode = '';
  itemName = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
     paginatedItemsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredItems().length / this.itemsPerPage);
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
    const filtered = this.filteredItems();
    this.paginatedItemsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
            this.router.navigate(['/panel/employees-master-data/create-new-gosiid']);

  }

  createItem() {
    if (!this.itemCode || !this.itemName) return;

    this.items.push({
      code: this.itemCode,
      name: this.itemName,
    });

    this.hideForm();
  }

  // ✅ Edit
  editItem() {
 
            this.router.navigate(['/panel/employees-master-data/edit-gosiid']);

  }

  updateItem() {
    if (this.editIndex === null) return;

    this.items[this.editIndex] = {
      code: this.itemCode,
      name: this.itemName,
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteItem(index: number) {
    this.items.splice(index, 1);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
            this.router.navigate(['/panel/employees-master-data/view-all-gosiid']);

  }

  resetForm() {
    this.itemCode = '';
    this.itemName = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredItems() {
    if (!this.searchText.trim()) return this.items;

    return this.items.filter(item =>
      item.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}