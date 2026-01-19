import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-accomodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
})
export class AccommodationComponent {
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
        this.formTitle = "Edit Accommodation"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Accommodation"


      }
    });
  }

  // ✅ Active Tab
  activeTab: 'roomDetail' | 'equipment' = 'roomDetail';

  // ✅ Room Detail Data
  rooms = [
    { floor: '1st Floor', roomNo: '101', availableSpace: 250, currentOccupied: 3, remarks: 'Shared room with AC' },
    { floor: '1st Floor', roomNo: '102', availableSpace: 300, currentOccupied: 2, remarks: 'Private room' },
    { floor: '1st Floor', roomNo: '103', availableSpace: 200, currentOccupied: 4, remarks: 'Standard dormitory' },
    { floor: '2nd Floor', roomNo: '201', availableSpace: 350, currentOccupied: 1, remarks: 'Executive suite' },
    { floor: '2nd Floor', roomNo: '202', availableSpace: 280, currentOccupied: 2, remarks: 'Double occupancy' },
    { floor: '2nd Floor', roomNo: '203', availableSpace: 220, currentOccupied: 3, remarks: 'Triple sharing' },
    { floor: '3rd Floor', roomNo: '301', availableSpace: 400, currentOccupied: 1, remarks: 'Premium single room' },
    { floor: '3rd Floor', roomNo: '302', availableSpace: 320, currentOccupied: 2, remarks: 'Deluxe room' },
    { floor: '3rd Floor', roomNo: '303', availableSpace: 270, currentOccupied: 3, remarks: 'Standard room with balcony' },
    { floor: 'Ground Floor', roomNo: '001', availableSpace: 500, currentOccupied: 5, remarks: 'Conference room' }
  ];

  // ✅ Equipment Data
  equipments = [
    { code: 'EQ001', name: 'Bed', quantity: 50, type: 'Furniture', remarks: 'Single bed with mattress' },
    { code: 'EQ002', name: 'Wardrobe', quantity: 30, type: 'Furniture', remarks: 'Wooden wardrobe' },
    { code: 'EQ003', name: 'Desk', quantity: 40, type: 'Furniture', remarks: 'Study table with drawer' },
    { code: 'EQ004', name: 'Chair', quantity: 60, type: 'Furniture', remarks: 'Office chair' },
    { code: 'EQ005', name: 'Air Conditioner', quantity: 15, type: 'Electronics', remarks: '1.5 ton split AC' },
    { code: 'EQ006', name: 'Heater', quantity: 10, type: 'Electronics', remarks: 'Room heater' },
    { code: 'EQ007', name: 'Refrigerator', quantity: 8, type: 'Appliances', remarks: 'Double door refrigerator' },
    { code: 'EQ008', name: 'Microwave', quantity: 5, type: 'Appliances', remarks: '900W microwave oven' },
    { code: 'EQ009', name: 'Television', quantity: 12, type: 'Electronics', remarks: '32 inch LED TV' },
    { code: 'EQ010', name: 'WiFi Router', quantity: 20, type: 'Networking', remarks: 'Dual band router' },
    { code: 'EQ011', name: 'Projector', quantity: 3, type: 'Electronics', remarks: 'HD projector' },
    { code: 'EQ012', name: 'Whiteboard', quantity: 8, type: 'Office Supplies', remarks: 'Magnetic whiteboard' }
  ];


  fetchAccommodation() {
    return this.rooms,this.equipments;
  }

  // ✅ Form + State
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
     paginatedEquipmentsList: any[] = [];
        paginatedRoomsList: any[] = [];



  // ✅ Tab Switching
  switchTab(tab: 'roomDetail' | 'equipment') {
    this.activeTab = tab;
    this.currentPage = 1; // Reset to first page when switching tabs
        this.updatePagination();

  }

  // ✅ Current Data based on active tab
  get currentData() {
    return this.activeTab === 'roomDetail' ? this.rooms : this.equipments;
  }

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredData().length / this.itemsPerPage);
  }

    get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ✅ Pagination Data - Room Detail


  // ✅ Pagination Data - Equipment
 
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }

updatePagination() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;

  if (this.activeTab === 'roomDetail') {
    const filteredRooms = this.filteredRooms();
    this.paginatedRoomsList = filteredRooms.slice(start, end);
  } else {
    const filteredEquipments = this.filteredEquipments();
    this.paginatedEquipmentsList = filteredEquipments.slice(start, end);
  }
}




  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Filtered Data based on active tab
  filteredData() {
    if (!this.searchText.trim()) {
      return this.currentData;
    }

    const searchLower = this.searchText.toLowerCase();
    if (this.activeTab === 'roomDetail') {
      return this.filteredRooms();
    } else {
      return this.filteredEquipments();
    }
  }

  // ✅ Filter Rooms
  filteredRooms() {
    if (!this.searchText.trim()) return this.rooms;

    const searchLower = this.searchText.toLowerCase();
    return this.rooms.filter(room =>
      room.floor.toLowerCase().includes(searchLower) ||
      room.roomNo.toLowerCase().includes(searchLower) ||
      room.remarks.toLowerCase().includes(searchLower) ||
      room.availableSpace.toString().includes(searchLower) ||
      room.currentOccupied.toString().includes(searchLower)
    );
  }

  // ✅ Filter Equipments
  filteredEquipments() {
    if (!this.searchText.trim()) return this.equipments;

    const searchLower = this.searchText.toLowerCase();
    return this.equipments.filter(equipment =>
      equipment.code.toLowerCase().includes(searchLower) ||
      equipment.name.toLowerCase().includes(searchLower) ||
      equipment.type.toLowerCase().includes(searchLower) ||
      equipment.remarks.toLowerCase().includes(searchLower) ||
      equipment.quantity.toString().includes(searchLower)
    );
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
        this.router.navigate(['/panel/employees-master-data/create-new-accommodation']);


  }

  // ✅ Edit Room
  editRoom(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.activeTab = 'roomDetail';
    this.showForm = true;
            this.router.navigate(['/panel/employees-master-data/edit-accommodation']);

    // In real implementation, you would load the room data into form fields
  }

  // ✅ Edit Equipment
  editEquipment(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.activeTab = 'equipment';
    this.showForm = true;
    // In real implementation, you would load the equipment data into form fields
  }

  // ✅ Delete Room
  deleteRoom(index: number) {
    if (confirm('Are you sure you want to delete this room detail?')) {
      this.rooms.splice(index, 1);

      if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Delete Equipment
  deleteEquipment(index: number) {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipments.splice(index, 1);

      if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Save (Placeholder)
  saveForm() {
    alert(`Form submitted for ${this.activeTab}. This is a placeholder - form functionality will be implemented later.`);
    this.hideForm();
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/employees-master-data/view-all-accommodation']);

  }

  resetForm() {
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }
}