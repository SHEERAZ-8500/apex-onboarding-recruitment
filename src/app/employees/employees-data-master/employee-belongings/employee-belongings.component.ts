import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-belongings',
  templateUrl: './employee-belongings.component.html',
  styleUrls: ['./employee-belongings.component.scss'],
})
export class EmployeeBelongingsComponent {

  // ✅ Ownership Types dropdown options (a to e)
  ownershipTypes = ['Company Owned', 'Employee Owned', 'Leased', 'Rented', 'Donated'];
  
  // ✅ Belonging Types dropdown options (a to e)
  belongingTypes = ['Electronic', 'Furniture', 'Vehicle', 'Equipment', 'Other'];

  // ✅ Employees Belongings Data
  belongings = [
    { 
      code: 'EB001', 
      description: 'Laptop', 
      type: 'Electronic', 
      depreciation: 500, 
      rent: 100, 
      belongingType: 'Company Owned',
      uniqueId: 'LP-2023-001',
      model: 'Dell Latitude 5440',
      specifications: 'Intel i7, 16GB RAM, 512GB SSD, 14" FHD',
      manufacturer: 'Dell Technologies'
    },
    { 
      code: 'EB002', 
      description: 'Office Chair', 
      type: 'Furniture', 
      depreciation: 50, 
      rent: 10, 
      belongingType: 'Company Owned',
      uniqueId: 'CHAIR-2023-001',
      model: 'ErgoPro 500',
      specifications: 'Ergonomic design, lumbar support, adjustable height',
      manufacturer: 'OfficeComfort'
    },
    { 
      code: 'EB003', 
      description: 'Company Car', 
      type: 'Vehicle', 
      depreciation: 2000, 
      rent: 500, 
      belongingType: 'Leased',
      uniqueId: 'CAR-2023-001',
      model: 'Toyota Camry 2023',
      specifications: 'Hybrid, Automatic, Sedan, White Color',
      manufacturer: 'Toyota'
    },
    { 
      code: 'EB004', 
      description: 'Projector', 
      type: 'Electronic', 
      depreciation: 200, 
      rent: 40, 
      belongingType: 'Company Owned',
      uniqueId: 'PROJ-2023-001',
      model: 'Epson EB-U05',
      specifications: 'Full HD, 3500 Lumens, Wireless Connectivity',
      manufacturer: 'Epson'
    },
    { 
      code: 'EB005', 
      description: 'Desk', 
      type: 'Furniture', 
      depreciation: 75, 
      rent: 15, 
      belongingType: 'Company Owned',
      uniqueId: 'DESK-2023-001',
      model: 'Executive Desk 2000',
      specifications: '180x80 cm, Mahogany Finish, Cable Management',
      manufacturer: 'OfficeFurn'
    },
    { 
      code: 'EB006', 
      description: 'Mobile Phone', 
      type: 'Electronic', 
      depreciation: 300, 
      rent: 50, 
      belongingType: 'Employee Owned',
      uniqueId: 'PHONE-2023-001',
      model: 'iPhone 14 Pro',
      specifications: '128GB, Deep Purple, 5G, Face ID',
      manufacturer: 'Apple'
    },
    { 
      code: 'EB007', 
      description: 'Printer', 
      type: 'Equipment', 
      depreciation: 150, 
      rent: 30, 
      belongingType: 'Company Owned',
      uniqueId: 'PRINT-2023-001',
      model: 'HP LaserJet Pro',
      specifications: 'Color Laser, Wireless, Duplex Printing',
      manufacturer: 'HP'
    },
    { 
      code: 'EB008', 
      description: 'Server Rack', 
      type: 'Equipment', 
      depreciation: 800, 
      rent: 150, 
      belongingType: 'Company Owned',
      uniqueId: 'RACK-2023-001',
      model: 'APC NetShelter',
      specifications: '42U, Cooling System, Lockable Doors',
      manufacturer: 'APC'
    },
    { 
      code: 'EB009', 
      description: 'Monitor', 
      type: 'Electronic', 
      depreciation: 250, 
      rent: 45, 
      belongingType: 'Company Owned',
      uniqueId: 'MON-2023-001',
      model: 'Dell UltraSharp 27"',
      specifications: '4K UHD, IPS Panel, USB-C',
      manufacturer: 'Dell'
    },
    { 
      code: 'EB010', 
      description: 'Conference Table', 
      type: 'Furniture', 
      depreciation: 400, 
      rent: 80, 
      belongingType: 'Rented',
      uniqueId: 'TABLE-2023-001',
      model: 'Boardroom Elite',
      specifications: 'Oval, 12 Seater, Walnut Finish',
      manufacturer: 'ConferencePro'
    }
  ];

  // ✅ Form + State
  showForm = false;
  belongingCode = '';
  belongingDescription = '';
  belongingOwnership = '';
  belongingType = '';
  belongingUniqueId = '';
  belongingModel = '';
  belongingDepreciation: number | null = null;
  belongingRent: number | null = null;
  belongingSpecifications = '';
  belongingManufacturer = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredBelongings().length / this.itemsPerPage);
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
  paginatedBelongings() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBelongings().slice(start, start + this.itemsPerPage);
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

  createBelonging() {
    if (!this.validateForm()) {
      return;
    }

    this.belongings.push({
      code: this.belongingCode,
      description: this.belongingDescription,
      type: this.belongingType,
      depreciation: this.belongingDepreciation!,
      rent: this.belongingRent!,
      belongingType: this.belongingOwnership,
      uniqueId: this.belongingUniqueId,
      model: this.belongingModel,
      specifications: this.belongingSpecifications,
      manufacturer: this.belongingManufacturer
    });

    this.hideForm();
  }

  // ✅ Edit
  editBelonging(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const belonging = this.belongings[index];
    this.belongingCode = belonging.code;
    this.belongingDescription = belonging.description;
    this.belongingOwnership = belonging.belongingType;
    this.belongingType = belonging.type;
    this.belongingUniqueId = belonging.uniqueId;
    this.belongingModel = belonging.model;
    this.belongingDepreciation = belonging.depreciation;
    this.belongingRent = belonging.rent;
    this.belongingSpecifications = belonging.specifications;
    this.belongingManufacturer = belonging.manufacturer;
  }

  updateBelonging() {
    if (this.editIndex === null || !this.validateForm()) {
      return;
    }

    this.belongings[this.editIndex] = {
      code: this.belongingCode,
      description: this.belongingDescription,
      type: this.belongingType,
      depreciation: this.belongingDepreciation!,
      rent: this.belongingRent!,
      belongingType: this.belongingOwnership,
      uniqueId: this.belongingUniqueId,
      model: this.belongingModel,
      specifications: this.belongingSpecifications,
      manufacturer: this.belongingManufacturer
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteBelonging(index: number) {
    if (confirm('Are you sure you want to delete this belonging?')) {
      this.belongings.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Validation
  validateForm(): boolean {
    if (!this.belongingCode || !this.belongingDescription || !this.belongingOwnership || 
        !this.belongingType || !this.belongingUniqueId || !this.belongingModel ||
        this.belongingDepreciation === null || this.belongingRent === null ||
        !this.belongingSpecifications || !this.belongingManufacturer) {
      alert('Please fill all required fields');
      return false;
    }

    if (this.belongingDepreciation < 0) {
      alert('Depreciation amount cannot be negative');
      return false;
    }

    if (this.belongingRent < 0) {
      alert('Rent amount cannot be negative');
      return false;
    }

    // Check if Unique ID already exists (except in edit mode)
    if (!this.isEdit) {
      const existingUniqueId = this.belongings.find(b => b.uniqueId === this.belongingUniqueId);
      if (existingUniqueId) {
        alert('Unique ID already exists. Please use a different Unique ID.');
        return false;
      }
    }

    return true;
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.belongingCode = '';
    this.belongingDescription = '';
    this.belongingOwnership = '';
    this.belongingType = '';
    this.belongingUniqueId = '';
    this.belongingModel = '';
    this.belongingDepreciation = null;
    this.belongingRent = null;
    this.belongingSpecifications = '';
    this.belongingManufacturer = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredBelongings() {
    if (!this.searchText.trim()) return this.belongings;

    const searchLower = this.searchText.toLowerCase();
    return this.belongings.filter(belonging =>
      belonging.code.toLowerCase().includes(searchLower) ||
      belonging.description.toLowerCase().includes(searchLower) ||
      belonging.type.toLowerCase().includes(searchLower) ||
      belonging.belongingType.toLowerCase().includes(searchLower) ||
      belonging.uniqueId.toLowerCase().includes(searchLower) ||
      belonging.model.toLowerCase().includes(searchLower) ||
      belonging.manufacturer.toLowerCase().includes(searchLower) ||
      belonging.depreciation.toString().includes(searchLower) ||
      belonging.rent.toString().includes(searchLower) ||
      belonging.specifications.toLowerCase().includes(searchLower)
    );
  }
}