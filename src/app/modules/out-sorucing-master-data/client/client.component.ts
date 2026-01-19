import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
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
        this.formTitle="Edit Client"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Client"


      }
    });
  }

  // ✅ Clients Data
  clients = [
    {
      customerNo: 'CUST001',
      customerName: 'ABC Corporation',
      bankName: 'National Bank',
      accountNo: '1234567890',
      city: 'New York',
      toAddress: '123 Main Street, NY 10001',
      vatNo: 'VAT123456789'
    },
    {
      customerNo: 'CUST002',
      customerName: 'XYZ Ltd',
      bankName: 'Global Bank',
      accountNo: '0987654321',
      city: 'London',
      toAddress: '456 Oxford Street, London W1',
      vatNo: 'GB123456789'
    },
    {
      customerNo: 'CUST003',
      customerName: 'Tech Solutions Inc',
      bankName: 'Tech Bank',
      accountNo: '1122334455',
      city: 'San Francisco',
      toAddress: '789 Market Street, SF 94105',
      vatNo: 'US987654321'
    },
    {
      customerNo: 'CUST004',
      customerName: 'Manufacturing Co',
      bankName: 'Industrial Bank',
      accountNo: '5566778899',
      city: 'Chicago',
      toAddress: '101 Industrial Park, Chicago 60601',
      vatNo: 'US456789123'
    },
    {
      customerNo: 'CUST005',
      customerName: 'Retail Chain',
      bankName: 'Commerce Bank',
      accountNo: '3344556677',
      city: 'Miami',
      toAddress: '222 Beach Avenue, Miami 33101',
      vatNo: 'US789123456'
    },
    {
      customerNo: 'CUST006',
      customerName: 'Service Provider',
      bankName: 'Service Bank',
      accountNo: '8899001122',
      city: 'Dallas',
      toAddress: '333 Service Road, Dallas 75201',
      vatNo: 'US321654987'
    },
    {
      customerNo: 'CUST007',
      customerName: 'Consulting Firm',
      bankName: 'Professional Bank',
      accountNo: '4455667788',
      city: 'Boston',
      toAddress: '444 Consultant Lane, Boston 02101',
      vatNo: 'US654987321'
    },
    {
      customerNo: 'CUST008',
      customerName: 'Logistics Company',
      bankName: 'Transport Bank',
      accountNo: '6677889900',
      city: 'Atlanta',
      toAddress: '555 Logistics Drive, Atlanta 30301',
      vatNo: 'US987321654'
    }
  ];



  // ✅ Form Fields
  customerNo = '';
  customerName = '';
  bankName = '';
  accountNo = '';
  city = '';
  toAddress = '';
  vatNo = '';

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;
     paginatedClientsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredClients().length / this.itemsPerPage);
  }

   get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.customerNo &&
      this.customerName
    );
    // Note: Only Customer Code and Customer Name are required
    // Other fields are optional
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
    const filtered = this.filteredClients();
    this.paginatedClientsList = filtered.slice(start, end);
  }


  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }


  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
            this.router.navigate(['/panel/out-sourcing-master-data/create-new-client']);

  }

  createClient() {
    if (!this.isFormValid()) return;

    this.clients.push({
      customerNo: this.customerNo,
      customerName: this.customerName,
      bankName: this.bankName,
      accountNo: this.accountNo,
      city: this.city,
      toAddress: this.toAddress,
      vatNo: this.vatNo
    });

    this.hideForm();
  }

  // ✅ Edit
  editClient() {
                this.router.navigate(['/panel/out-sourcing-master-data/edit-client']);

  }

  updateClient() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.clients[this.editIndex] = {
      customerNo: this.customerNo,
      customerName: this.customerName,
      bankName: this.bankName,
      accountNo: this.accountNo,
      city: this.city,
      toAddress: this.toAddress,
      vatNo: this.vatNo
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteClient(index: number) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clients.splice(index, 1);

       if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
            this.router.navigate(['/panel/out-sourcing-master-data/view-all-client']);

  }

  resetForm() {
    this.customerNo = '';
    this.customerName = '';
    this.bankName = '';
    this.accountNo = '';
    this.city = '';
    this.toAddress = '';
    this.vatNo = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredClients() {
    if (!this.searchText.trim()) return this.clients;

    const searchLower = this.searchText.toLowerCase();
    return this.clients.filter(client =>
      client.customerNo.toLowerCase().includes(searchLower) ||
      client.customerName.toLowerCase().includes(searchLower) ||
      client.bankName.toLowerCase().includes(searchLower) ||
      client.accountNo.toLowerCase().includes(searchLower) ||
      client.city.toLowerCase().includes(searchLower) ||
      client.toAddress.toLowerCase().includes(searchLower) ||
      client.vatNo.toLowerCase().includes(searchLower)
    );
  }
}