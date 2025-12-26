import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
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
        this.formTitle="Edit Company"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Company"


      }
    });
  }

  // ✅ Dropdown Options
  dropdownOptions = {
    countries: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Germany',
      'France',
      'Japan',
      'China',
      'India',
      'Brazil',
      'Mexico',
      'Spain',
      'Italy',
      'South Korea',
      'Russia',
      'Netherlands',
      'Switzerland',
      'Sweden',
      'Norway',
      'Denmark'
    ],
    
    managers: [
      'John Smith',
      'Emma Johnson',
      'Michael Brown',
      'Sarah Davis',
      'Robert Wilson',
      'Lisa Anderson',
      'David Miller',
      'Jennifer Taylor',
      'James Moore',
      'Patricia Lee'
    ]
  };

  // ✅ Companies Data
  companies = [
    {
      companiesCode: 'OC-00019',
      companyName: 'AZ Engineers and Partners llc',
      address: 'Ghala, Muscat, Oman',
      street: 'Ghala',
      block: 'A',
      building: 'Tower 1',
      city: 'Muscat',
      zipCode: '112',
      country: 'Oman',
      state: 'Muscat',
      internetAddress: 'www.azengineers.com',
      printingHeader: 'AZ Engineers',
      manager: 'John Smith',
      aliasName: 'AZEP',
      telephoneNo1: '000096897199570',
      telephone2: '',
      fax: '',
      emailAddress: 'hadi.hassan@azengineers.com',
      gln: '1234567890123',
      signature1: '',
      signature2: '',
      signature3: '',
      signature4: ''
    },
    {
      companiesCode: 'CC-00020',
      companyName: 'Global Tech Solutions',
       address: 'Ghala, Muscat, Oman',

      street: 'Main Street',
      block: 'B',
      building: 'Tech Park',
      city: 'New York',
      zipCode: '10001',
      country: 'United States',
      state: 'NY',
      internetAddress: 'www.globaltech.com',
      printingHeader: 'Global Tech',
      manager: 'Emma Johnson',
      aliasName: 'GTS',
      telephoneNo1: '+1-212-555-1234',
      telephone2: '+1-212-555-5678',
      fax: '+1-212-555-9876',
      emailAddress: 'info@globaltech.com',
      gln: '9876543210987',
      signature1: '',
      signature2: '',
      signature3: '',
      signature4: ''
    }
  ];

   fetchCompany() {
    return this.companies;
  }

  // ✅ Form Fields
  companiesCode = '';
  companyName = '';
  address = '';
  street = '';
  block = '';
  building = '';
  city = '';
  zipCode = '';
  country = '';
  state = '';
  internetAddress = '';
  printingHeader = '';
  manager = '';
  aliasName = '';
  telephoneNo1 = '';
  telephone2 = '';
  fax = '';
  emailAddress = '';
  gln = '';
  
  // File upload fields
  signature1FileName = '';
  signature2FileName = '';
  signature3FileName = '';
  signature4FileName = '';
  
  signature1File: File | null = null;
  signature2File: File | null = null;
  signature3File: File | null = null;
  signature4File: File | null = null;

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredCompanies().length / this.itemsPerPage);
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

  // ✅ File Upload Methods
  onSignature1Change(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.signature1FileName = file.name;
      this.signature1File = file;
    }
  }

  onSignature2Change(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.signature2FileName = file.name;
      this.signature2File = file;
    }
  }

  onSignature3Change(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.signature3FileName = file.name;
      this.signature3File = file;
    }
  }

  onSignature4Change(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.signature4FileName = file.name;
      this.signature4File = file;
    }
  }

  removeSignature1() {
    this.signature1FileName = '';
    this.signature1File = null;
    const input = document.querySelector('input[type="file"]#signature1Input') as HTMLInputElement;
    if (input) input.value = '';
  }

  removeSignature2() {
    this.signature2FileName = '';
    this.signature2File = null;
    const input = document.querySelector('input[type="file"]#signature2Input') as HTMLInputElement;
    if (input) input.value = '';
  }

  removeSignature3() {
    this.signature3FileName = '';
    this.signature3File = null;
    const input = document.querySelector('input[type="file"]#signature3Input') as HTMLInputElement;
    if (input) input.value = '';
  }

  removeSignature4() {
    this.signature4FileName = '';
    this.signature4File = null;
    const input = document.querySelector('input[type="file"]#signature4Input') as HTMLInputElement;
    if (input) input.value = '';
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.companiesCode &&
      this.companyName &&
      this.country &&
      this.telephoneNo1 &&
      this.emailAddress
    );
  }

  // ✅ Pagination Data
  paginatedCompanies() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCompanies().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
            this.router.navigate(['/panel/out-sourcing-master-data/create-new-company']);

  }

  createCompany() {
    if (!this.isFormValid()) return;

    this.companies.push({
      companiesCode: this.companiesCode,
      companyName: this.companyName,
      address: this.address,
      street: this.street,
      block: this.block,
      building: this.building,
      city: this.city,
      zipCode: this.zipCode,
      country: this.country,
      state: this.state,
      internetAddress: this.internetAddress,
      printingHeader: this.printingHeader,
      manager: this.manager,
      aliasName: this.aliasName,
      telephoneNo1: this.telephoneNo1,
      telephone2: this.telephone2,
      fax: this.fax,
      emailAddress: this.emailAddress,
      gln: this.gln,
      signature1: this.signature1FileName,
      signature2: this.signature2FileName,
      signature3: this.signature3FileName,
      signature4: this.signature4FileName
    });

    this.hideForm();
  }

  // ✅ Edit
  editCompany() {
                this.router.navigate(['/panel/out-sourcing-master-data/edit-company']);

    
  }

  updateCompany() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.companies[this.editIndex] = {
      companiesCode: this.companiesCode,
      companyName: this.companyName,
      address: this.address,
      street: this.street,
      block: this.block,
      building: this.building,
      city: this.city,
      zipCode: this.zipCode,
      country: this.country,
      state: this.state,
      internetAddress: this.internetAddress,
      printingHeader: this.printingHeader,
      manager: this.manager,
      aliasName: this.aliasName,
      telephoneNo1: this.telephoneNo1,
      telephone2: this.telephone2,
      fax: this.fax,
      emailAddress: this.emailAddress,
      gln: this.gln,
      signature1: this.signature1FileName,
      signature2: this.signature2FileName,
      signature3: this.signature3FileName,
      signature4: this.signature4FileName
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteCompany(index: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companies.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
                this.router.navigate(['/panel/out-sourcing-master-data/view-all-company']);

  }

  resetForm() {
    this.companiesCode = '';
    this.companyName = '';
    this.street = '';
    this.block = '';
    this.building = '';
    this.city = '';
    this.zipCode = '';
    this.country = '';
    this.state = '';
    this.internetAddress = '';
    this.printingHeader = '';
    this.manager = '';
    this.aliasName = '';
    this.telephoneNo1 = '';
    this.telephone2 = '';
    this.fax = '';
    this.emailAddress = '';
    this.gln = '';
    this.signature1FileName = '';
    this.signature2FileName = '';
    this.signature3FileName = '';
    this.signature4FileName = '';
    this.signature1File = null;
    this.signature2File = null;
    this.signature3File = null;
    this.signature4File = null;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredCompanies() {
    if (!this.searchText.trim()) return this.companies;

    const searchLower = this.searchText.toLowerCase();
    return this.companies.filter(company =>
      company.companiesCode.toLowerCase().includes(searchLower) ||
      company.companyName.toLowerCase().includes(searchLower) ||
      company.aliasName.toLowerCase().includes(searchLower) ||
      company.emailAddress.toLowerCase().includes(searchLower) ||
      company.telephoneNo1.toLowerCase().includes(searchLower) ||
      company.city.toLowerCase().includes(searchLower) ||
      company.country.toLowerCase().includes(searchLower)
    );
  }
}