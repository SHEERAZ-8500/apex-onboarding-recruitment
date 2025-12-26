import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface Customer {
  id: string;
  name: string;
  bankName: string;
  phoneNo: string;
  contactPerson: string;
  vatNo: string;
}

interface Contract {
  id: number;
  documentNo: string;
  postingDate: Date;
  requestorName: string;
  customerId: string;
  customerName: string;
  customerNo: string;
  bankName: string;
  phoneNo: string;
  contactPerson: string;
  vatNo: string;
  paymentTerm: string;
  signature: string;
}

interface ContractDetail {
  jobTitle: string;
  area: string;
  location: string;
  facility: number;
  posts: string;
  noOfEmployees: number;
  amountPerEmployee: number;
  requiredDate: string;
}

@Component({
  selector: 'app-outsource-contract',
  templateUrl: './outsource-contract.component.html',
  styleUrls: ['./outsource-contract.component.scss'],
})
export class OutsourceContractComponent {
  title = 'view';
  formTitle = ""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Outsource Contract"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Outsource Contract"


      }
    });
  }

  // ✅ Contracts Data
  contracts: Contract[] = [
    {
      id: 1,
      documentNo: 'OUTSC0000001',
      postingDate: new Date('2025-12-01'),
      requestorName: 'John Smith',
      customerId: 'CUST001',
      customerName: 'ABC Corporation',
      customerNo: 'C001',
      bankName: 'City Bank',
      phoneNo: '123-456-7890',
      contactPerson: 'Alice Johnson',
      vatNo: 'VAT00123456',
      paymentTerm: 'Net 30',
      signature: 'J. Smith'
    },
    {
      id: 2,
      documentNo: 'OUTSC0000002',
      postingDate: new Date('2025-12-05'),
      requestorName: 'Sarah Johnson',
      customerId: 'CUST002',
      customerName: 'XYZ Industries',
      customerNo: 'C002',
      bankName: 'National Bank',
      phoneNo: '987-654-3210',
      contactPerson: 'Bob Williams',
      vatNo: 'VAT00234567',
      paymentTerm: 'Net 60',
      signature: 'S. Johnson'
    },
    {
      id: 3,
      documentNo: 'OUTSC0000003',
      postingDate: new Date('2025-12-08'),
      requestorName: 'Michael Brown',
      customerId: 'CUST003',
      customerName: 'Tech Solutions Ltd',
      customerNo: 'C003',
      bankName: 'Global Bank',
      phoneNo: '555-123-4567',
      contactPerson: 'Carol Davis',
      vatNo: 'VAT00345678',
      paymentTerm: 'COD',
      signature: 'M. Brown'
    },
    {
      id: 4,
      documentNo: 'OUTSC0000004',
      postingDate: new Date('2025-12-10'),
      requestorName: 'Emily Davis',
      customerId: 'CUST004',
      customerName: 'Global Enterprises',
      customerNo: 'C004',
      bankName: 'First Bank',
      phoneNo: '444-555-6666',
      contactPerson: 'David Miller',
      vatNo: 'VAT00456789',
      paymentTerm: 'Advance',
      signature: 'E. Davis'
    },
    {
      id: 5,
      documentNo: 'OUTSC0000005',
      postingDate: new Date('2025-12-12'),
      requestorName: 'Robert Wilson',
      customerId: 'CUST005',
      customerName: 'Innovative Tech',
      customerNo: 'C005',
      bankName: 'Union Bank',
      phoneNo: '777-888-9999',
      contactPerson: 'Eva Thompson',
      vatNo: 'VAT00567890',
      paymentTerm: 'Net 90',
      signature: 'R. Wilson'
    },
  ];

  // ✅ Contract Details Table Data (with sample row as in image)
  contractDetails: ContractDetail[] = [
    {
      jobTitle: 'Camp Boss',
      area: 'Enter Area Name',
      location: 'Enter Location',
      facility: 0,
      posts: 'Enter Posts',
      noOfEmployees: 0,
      amountPerEmployee: 0,
      requiredDate: this.formatDate(new Date('2025-12-09'))
    }
  ];

  // ✅ Customers List for Dropdown
  customers: Customer[] = [
    { id: 'CUST001', name: 'ABC Corporation', bankName: 'City Bank', phoneNo: '123-456-7890', contactPerson: 'Alice Johnson', vatNo: 'VAT00123456' },
    { id: 'CUST002', name: 'XYZ Industries', bankName: 'National Bank', phoneNo: '987-654-3210', contactPerson: 'Bob Williams', vatNo: 'VAT00234567' },
    { id: 'CUST003', name: 'Tech Solutions Ltd', bankName: 'Global Bank', phoneNo: '555-123-4567', contactPerson: 'Carol Davis', vatNo: 'VAT00345678' },
    { id: 'CUST004', name: 'Global Enterprises', bankName: 'First Bank', phoneNo: '444-555-6666', contactPerson: 'David Miller', vatNo: 'VAT00456789' },
    { id: 'CUST005', name: 'Innovative Tech', bankName: 'Union Bank', phoneNo: '777-888-9999', contactPerson: 'Eva Thompson', vatNo: 'VAT00567890' },
    { id: 'CUST006', name: 'Modern Systems', bankName: 'Tech Bank', phoneNo: '222-333-4444', contactPerson: 'Frank Wilson', vatNo: 'VAT00678901' },
    { id: 'CUST007', name: 'Future Tech', bankName: 'Digital Bank', phoneNo: '111-222-3333', contactPerson: 'Grace Brown', vatNo: 'VAT00789012' },
    { id: 'CUST008', name: 'Digital Solutions', bankName: 'Online Bank', phoneNo: '999-888-7777', contactPerson: 'Henry Taylor', vatNo: 'VAT00890123' }
  ];
  fetchcontracts() {
    return this.contracts;
  }

  // ✅ Form + State
  showForm = false;
  documentNo = '';
  requestorName = '';
  selectedCustomer = '';
  paymentTerm = '';
  postingDate = this.formatDate(new Date());
  signature = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;

  // ✅ Helper function to format date
  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredContracts().length / this.itemsPerPage);
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
  paginatedContracts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredContracts().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    // Generate new document number
    const lastDocNo = this.contracts.length > 0 ?
      parseInt(this.contracts[this.contracts.length - 1].documentNo.replace('OUTSC', '')) : 0;
    this.documentNo = `OUTSC${(lastDocNo + 1).toString().padStart(7, '0')}`;

    // Set today's date
    this.postingDate = this.formatDate(new Date());

    this.showForm = true;
    this.router.navigate(['/panel/organizational-master-data/create-new-outsource-contract']);

  }

  // ✅ Add new row to details table
  addDetailRow() {
    this.contractDetails.push({
      jobTitle: '',
      area: '',
      location: '',
      facility: 0,
      posts: '',
      noOfEmployees: 0,
      amountPerEmployee: 0,
      requiredDate: this.formatDate(new Date())
    });
  }

  createContract() {
    if (!this.documentNo || !this.requestorName || !this.selectedCustomer || !this.paymentTerm || !this.postingDate) {
      alert('Please fill all required fields');
      return;
    }

    const selectedCustomer = this.customers.find(c => c.id === this.selectedCustomer);

    this.contracts.push({
      id: this.contracts.length + 1,
      documentNo: this.documentNo,
      postingDate: new Date(this.postingDate),
      requestorName: this.requestorName,
      customerId: this.selectedCustomer,
      customerName: selectedCustomer?.name || '',
      customerNo: selectedCustomer?.id.replace('CUST', 'C') || '',
      bankName: selectedCustomer?.bankName || '',
      phoneNo: selectedCustomer?.phoneNo || '',
      contactPerson: selectedCustomer?.contactPerson || '',
      vatNo: selectedCustomer?.vatNo || '',
      paymentTerm: this.paymentTerm,
      signature: this.signature
    });

    this.hideForm();
  }

  // ✅ Edit
  editContract() {
    this.router.navigate(['/panel/organizational-master-data/edit-outsource-contract']);

  }

  updateContract() {
    if (this.editIndex === null) return;

    const selectedCustomer = this.customers.find(c => c.id === this.selectedCustomer);

    this.contracts[this.editIndex] = {
      id: this.contracts[this.editIndex].id,
      documentNo: this.documentNo,
      postingDate: new Date(this.postingDate),
      requestorName: this.requestorName,
      customerId: this.selectedCustomer,
      customerName: selectedCustomer?.name || '',
      customerNo: selectedCustomer?.id.replace('CUST', 'C') || '',
      bankName: selectedCustomer?.bankName || '',
      phoneNo: selectedCustomer?.phoneNo || '',
      contactPerson: selectedCustomer?.contactPerson || '',
      vatNo: selectedCustomer?.vatNo || '',
      paymentTerm: this.paymentTerm,
      signature: this.signature
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteContract(index: number) {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contracts.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
    this.router.navigate(['/panel/organizational-master-data/view-all-outsource-contract']);

  }

  resetForm() {
    this.documentNo = '';
    this.requestorName = '';
    this.selectedCustomer = '';
    this.paymentTerm = '';
    this.postingDate = this.formatDate(new Date());
    this.signature = '';
    this.isEdit = false;
    this.editIndex = null;
    this.contractDetails = [{
      jobTitle: 'Camp Boss',
      area: 'Enter Area Name',
      location: 'Enter Location',
      facility: 0,
      posts: 'Enter Posts',
      noOfEmployees: 0,
      amountPerEmployee: 0,
      requiredDate: this.formatDate(new Date())
    }];
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredContracts() {
    if (!this.searchText.trim()) return this.contracts;

    const searchLower = this.searchText.toLowerCase();
    return this.contracts.filter(contract =>
      contract.documentNo.toLowerCase().includes(searchLower) ||
      contract.requestorName.toLowerCase().includes(searchLower) ||
      contract.customerName.toLowerCase().includes(searchLower) ||
      contract.customerNo.toLowerCase().includes(searchLower) ||
      contract.bankName.toLowerCase().includes(searchLower) ||
      contract.phoneNo.toLowerCase().includes(searchLower) ||
      contract.contactPerson.toLowerCase().includes(searchLower) ||
      contract.vatNo.toLowerCase().includes(searchLower) ||
      contract.paymentTerm.toLowerCase().includes(searchLower)
    );
  }
}