import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss'],
  standalone: false,
})
export class HierarchyComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  // Sample data with 12 items (for full page)
  items: any[] = [
    {
      id: 1,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'a',
      showDropdown: false,
    },
    {
      id: 2,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'b',
      showDropdown: false,
    },
    {
      id: 3,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'c',
      showDropdown: false,
    },
    {
      id: 4,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'd',
      showDropdown: false,
    },
    {
      id: 5,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'e',
      showDropdown: false,
    },
    {
      id: 6,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'a',
      showDropdown: false,
    },
    {
      id: 7,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'b',
      showDropdown: false,
    },
    {
      id: 8,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'c',
      showDropdown: false,
    },
    {
      id: 9,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'd',
      showDropdown: false,
    },
    {
      id: 10,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'e',
      showDropdown: false,
    },
    {
      id: 11,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'a',
      showDropdown: false,
    },
    {
      id: 12,
      name: 'Human Resource Officer',
      title: 'Human Resource Officer',
      avatar: 'assets/nb (2).png',
      parent: 'b',
      showDropdown: false,
    },
  ];

  // Modal states
  showDeleteModal = false;
  showEditModal = false;
  isAddingNew = false;

  // Currently selected item for editing/deleting
  selectedItem: any = null;
  editingItem: any = {
    id: 0,
    name: '',
    title: '',
    avatar: 'assets/nb (2).png',
    parent: '',
  };

  ngOnInit() {
    // Initialize with sample data
  }

  // Listen for clicks anywhere in the document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check if click is outside any dropdown toggle button
    const clickedElement = event.target as HTMLElement;
    const isDropdownToggle = clickedElement.closest('.dropdown-toggle');
    const isDropdownMenu = clickedElement.closest('.dropdown-menu');

    // Only close dropdowns if click is outside both toggle and menu
    if (!isDropdownToggle && !isDropdownMenu) {
      this.closeAllDropdowns();
    }
  }

  // Dropdown toggle
  toggleDropdown(index: number, event: Event) {
    // Stop propagation to prevent document click from closing immediately
    event.stopPropagation();

    // Close all other dropdowns
    this.items.forEach((item, i) => {
      if (i !== index) {
        item.showDropdown = false;
      }
    });

    // Toggle current dropdown
    this.items[index].showDropdown = !this.items[index].showDropdown;
  }

  // Close all dropdowns
  closeAllDropdowns() {
    this.items.forEach((item) => {
      item.showDropdown = false;
    });
  }

  // Also close dropdowns when opening modals
  openDeleteModal(item: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.selectedItem = item;
    this.showDeleteModal = true;
    this.closeAllDropdowns();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedItem = null;
  }

  deleteItem() {
    if (this.selectedItem) {
      const index = this.items.findIndex(
        (item) => item.id === this.selectedItem.id
      );
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
    this.closeDeleteModal();
  }

  // Edit modal operations
  openEditModal(item: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isAddingNew = false;
    this.selectedItem = item;
    this.editingItem = {
      id: item.id,
      name: item.name,
      title: item.title,
      avatar: item.avatar,
      parent: item.parent,
    };
    this.showEditModal = true;
    this.closeAllDropdowns();
  }

  openAddModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isAddingNew = true;
    this.editingItem = {
      id:
        this.items.length > 0
          ? Math.max(...this.items.map((item) => item.id)) + 1
          : 1,
      name: '',
      title: '',
      avatar: 'assets/images/default-avatar.png',
      parent: '',
    };
    this.showEditModal = true;
    this.closeAllDropdowns();
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedItem = null;
    this.editingItem = {
      id: 0,
      name: '',
      title: '',
      avatar: 'assets/images/default-avatar.png',
      parent: '',
    };
  }

  saveItem() {
    if (this.isAddingNew) {
      // Add new item
      this.items.unshift({
        ...this.editingItem,
        showDropdown: false,
      });
    } else {
      // Update existing item
      const index = this.items.findIndex(
        (item) => item.id === this.editingItem.id
      );
      if (index !== -1) {
        this.items[index] = {
          ...this.editingItem,
          showDropdown: this.items[index].showDropdown,
        };
      }
    }
    this.closeEditModal();
  }

  // File upload operations
  triggerFileInput(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editingItem.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}