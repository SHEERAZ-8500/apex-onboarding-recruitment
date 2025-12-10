import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.scss'],
})
export class CustomerMasterComponent {

  // ✅ Dropdown Options
  dropdownOptions = {
    requiredServices: [
      'Security Services',
      'Cleaning Services',
      'Maintenance Services',
      'IT Services',
      'Consulting Services',
      'Logistics Services',
      'Facility Management',
      'Staffing Services',
      'Technical Support',
      'Customer Support'
    ],
    
    paymentTerms: [
      'Net 30',
      'Net 45',
      'Net 60',
      'Due on Receipt',
      '50% Advance, 50% on Completion',
      'Monthly in Arrears',
      'Quarterly in Advance',
      'Annual Payment',
      'Custom Terms',
      'Cash on Delivery'
    ],
    
    paymentFrequencies: [
      'Monthly',
      'Quarterly',
      'Semi-Annual',
      'Annual',
      'Bi-Weekly',
      'Weekly',
      'Custom',
      'On Project Completion',
      'Milestone Based',
      'As per Invoice'
    ],
    
    statusOptions: [
      'Active',
      'Inactive',
      'Pending',
      'Suspended',
      'Terminated',
      'Prospective',
      'On Hold'
    ]
  };

  // ✅ Customer Master Data
  customers = [
    {
      custCode: 'CUST001',
      custName: 'ABC Corporation',
      arabicName: 'شركة إيه بي سي',
      custType: 'Corporate',
      companyRegNo: 'CR123456',
      vatNo: 'VAT123456789',
      phoneNo: '+1-212-555-1234',
      mobileNo: '+1-212-555-5678',
      contactPerson: 'John Smith',
      bankName: 'National Bank',
      iban: 'US12345678901234567890',
      swiftCode: 'NBUS33XXX',
      beneficiaryName: 'ABC Corporation',
      paymentTerms: 'Net 30',
      paymentFrequency: 'Monthly',
      currentBalance: 15000.00,
      status: 'Active',
      contractNo: 'CON-2024-001',
      createdBy: 'Admin User',
      noOfAreas: 5,
      noOfLocations: 10,
      noOfPosts: 50
    },
    {
      custCode: 'CUST002',
      custName: 'XYZ Ltd',
      arabicName: 'شركة إكس واي زد',
      custType: 'Enterprise',
      companyRegNo: 'CR789012',
      vatNo: 'GB123456789',
      phoneNo: '+44-20-7123-4567',
      mobileNo: '+44-77-1234-5678',
      contactPerson: 'Emma Johnson',
      bankName: 'Global Bank',
      iban: 'GB29NWBK60161331926819',
      swiftCode: 'BARCGB22',
      beneficiaryName: 'XYZ Ltd',
      paymentTerms: 'Net 45',
      paymentFrequency: 'Quarterly',
      currentBalance: 25000.00,
      status: 'Active',
      contractNo: 'CON-2024-002',
      createdBy: 'Admin User',
      noOfAreas: 3,
      noOfLocations: 8,
      noOfPosts: 35
    },
    {
      custCode: 'CUST003',
      custName: 'Tech Solutions Inc',
      arabicName: 'حلول التكنولوجيا',
      custType: 'Technology',
      companyRegNo: 'CR345678',
      vatNo: 'US987654321',
      phoneNo: '+1-415-555-1234',
      mobileNo: '+1-415-555-5678',
      contactPerson: 'Michael Brown',
      bankName: 'Tech Bank',
      iban: 'US98765432109876543210',
      swiftCode: 'TECHUS6S',
      beneficiaryName: 'Tech Solutions Inc',
      paymentTerms: 'Due on Receipt',
      paymentFrequency: 'Monthly',
      currentBalance: 5000.00,
      status: 'Active',
      contractNo: 'CON-2024-003',
      createdBy: 'Admin User',
      noOfAreas: 2,
      noOfLocations: 5,
      noOfPosts: 25
    },
    {
      custCode: 'CUST004',
      custName: 'Manufacturing Co',
      arabicName: 'شركة التصنيع',
      custType: 'Manufacturing',
      companyRegNo: 'CR901234',
      vatNo: 'US456789123',
      phoneNo: '+1-312-555-1234',
      mobileNo: '+1-312-555-5678',
      contactPerson: 'Sarah Davis',
      bankName: 'Industrial Bank',
      iban: 'US11223344556677889900',
      swiftCode: 'INDUS3X',
      beneficiaryName: 'Manufacturing Co',
      paymentTerms: 'Net 60',
      paymentFrequency: 'Semi-Annual',
      currentBalance: 75000.00,
      status: 'Inactive',
      contractNo: 'CON-2024-004',
      createdBy: 'Admin User',
      noOfAreas: 8,
      noOfLocations: 15,
      noOfPosts: 120
    },
    {
      custCode: 'CUST005',
      custName: 'Retail Chain',
      arabicName: 'سلسلة التجزئة',
      custType: 'Retail',
      companyRegNo: 'CR567890',
      vatNo: 'US789123456',
      phoneNo: '+1-305-555-1234',
      mobileNo: '+1-305-555-5678',
      contactPerson: 'Robert Wilson',
      bankName: 'Commerce Bank',
      iban: 'US33445566778899001122',
      swiftCode: 'COMMUS33',
      beneficiaryName: 'Retail Chain',
      paymentTerms: '50% Advance, 50% on Completion',
      paymentFrequency: 'Custom',
      currentBalance: 32000.00,
      status: 'Pending',
      contractNo: 'CON-2024-005',
      createdBy: 'Admin User',
      noOfAreas: 12,
      noOfLocations: 25,
      noOfPosts: 180
    }
  ];

  // ✅ Form Fields
  custCode = '';
  custName = '';
  arabicName = '';
  requiredService = '';
  vatNo = '';
  phoneNo = '';
  mobileNo = '';
  contactPerson = '';
  bankName = '';
  iban = '';
  swiftCode = '';
  beneficiaryName = '';
  paymentTerms = '';
  paymentFrequency = '';
  status = '';
  contractNo = '';
  noOfAreas: number | null = null;
  noOfLocations: number | null = null;
  noOfPosts: number | null = null;

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
    return Math.ceil(this.filteredCustomers().length / this.itemsPerPage);
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

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.custCode &&
      this.custName &&
      this.paymentFrequency &&
      this.status
    );
  }

  // ✅ Pagination Data
  paginatedCustomers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCustomers().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createCustomer() {
    if (!this.isFormValid()) return;

    this.customers.push({
      custCode: this.custCode,
      custName: this.custName,
      arabicName: this.arabicName,
      custType: this.requiredService, // Mapping required service to cust type
      companyRegNo: '', // Not in form, setting empty
      vatNo: this.vatNo,
      phoneNo: this.phoneNo,
      mobileNo: this.mobileNo,
      contactPerson: this.contactPerson,
      bankName: this.bankName,
      iban: this.iban,
      swiftCode: this.swiftCode,
      beneficiaryName: this.beneficiaryName,
      paymentTerms: this.paymentTerms,
      paymentFrequency: this.paymentFrequency,
      currentBalance: 0.00, // Default value
      status: this.status,
      contractNo: this.contractNo,
      createdBy: 'System', // Default value
      noOfAreas: this.noOfAreas || 0,
      noOfLocations: this.noOfLocations || 0,
      noOfPosts: this.noOfPosts || 0
    });

    this.hideForm();
  }

  // ✅ Edit
  editCustomer(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const customer = this.customers[index];
    this.custCode = customer.custCode;
    this.custName = customer.custName;
    this.arabicName = customer.arabicName;
    this.requiredService = customer.custType;
    this.vatNo = customer.vatNo;
    this.phoneNo = customer.phoneNo;
    this.mobileNo = customer.mobileNo;
    this.contactPerson = customer.contactPerson;
    this.bankName = customer.bankName;
    this.iban = customer.iban;
    this.swiftCode = customer.swiftCode;
    this.beneficiaryName = customer.beneficiaryName;
    this.paymentTerms = customer.paymentTerms;
    this.paymentFrequency = customer.paymentFrequency;
    this.status = customer.status;
    this.contractNo = customer.contractNo;
    this.noOfAreas = customer.noOfAreas;
    this.noOfLocations = customer.noOfLocations;
    this.noOfPosts = customer.noOfPosts;
  }

  updateCustomer() {
    if (this.editIndex === null || !this.isFormValid()) return;

    this.customers[this.editIndex] = {
      custCode: this.custCode,
      custName: this.custName,
      arabicName: this.arabicName,
      custType: this.requiredService,
      companyRegNo: this.customers[this.editIndex].companyRegNo, // Keep existing
      vatNo: this.vatNo,
      phoneNo: this.phoneNo,
      mobileNo: this.mobileNo,
      contactPerson: this.contactPerson,
      bankName: this.bankName,
      iban: this.iban,
      swiftCode: this.swiftCode,
      beneficiaryName: this.beneficiaryName,
      paymentTerms: this.paymentTerms,
      paymentFrequency: this.paymentFrequency,
      currentBalance: this.customers[this.editIndex].currentBalance, // Keep existing
      status: this.status,
      contractNo: this.contractNo,
      createdBy: this.customers[this.editIndex].createdBy, // Keep existing
      noOfAreas: this.noOfAreas || 0,
      noOfLocations: this.noOfLocations || 0,
      noOfPosts: this.noOfPosts || 0
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteCustomer(index: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers.splice(index, 1);

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.custCode = '';
    this.custName = '';
    this.arabicName = '';
    this.requiredService = '';
    this.vatNo = '';
    this.phoneNo = '';
    this.mobileNo = '';
    this.contactPerson = '';
    this.bankName = '';
    this.iban = '';
    this.swiftCode = '';
    this.beneficiaryName = '';
    this.paymentTerms = '';
    this.paymentFrequency = '';
    this.status = '';
    this.contractNo = '';
    this.noOfAreas = null;
    this.noOfLocations = null;
    this.noOfPosts = null;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredCustomers() {
    if (!this.searchText.trim()) return this.customers;

    const searchLower = this.searchText.toLowerCase();
    return this.customers.filter(customer =>
      customer.custCode.toLowerCase().includes(searchLower) ||
      customer.custName.toLowerCase().includes(searchLower) ||
      customer.arabicName.toLowerCase().includes(searchLower) ||
      customer.custType.toLowerCase().includes(searchLower) ||
      customer.vatNo.toLowerCase().includes(searchLower) ||
      customer.phoneNo.toLowerCase().includes(searchLower) ||
      customer.contactPerson.toLowerCase().includes(searchLower) ||
      customer.bankName.toLowerCase().includes(searchLower) ||
      customer.contractNo.toLowerCase().includes(searchLower) ||
      customer.status.toLowerCase().includes(searchLower)
    );
  }
}