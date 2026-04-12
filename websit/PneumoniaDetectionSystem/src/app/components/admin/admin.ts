import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService, IUser } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  constructor(
    private fb: FormBuilder,
    private _admin_ser: AdminService,
  ) {}

  searchForm!: FormGroup;
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  typesCount = {
    doctor: 0,
    patient: 0,
    admin: 0,
  };
  users!: IUser[];
  static_url = 'http://127.0.0.1:3000/media/uploads/';
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: [''],
      role: [''],
    });
    this._admin_ser.get_all_user().subscribe((data: IUser[]) => {
      this.users = data;
      console.log(data);
      this.typesCount = this.users!.reduce(
        (acc, user) => {
          acc[user.user_type as keyof typeof acc] =
            (acc[user.user_type as keyof typeof acc] || 0) + 1;
          return acc;
        },
        { doctor: 0, patient: 0, admin: 0 },
      );
      this.filteredUsers = [...this.users!];
      this.updatePagination();
    });
  }

  onSearch() {
    const { query, role } = this.searchForm.value;

    this.filteredUsers = this.users.filter((user) => {
      const matchesQuery =
        user!.name.toLowerCase().includes(query.toLowerCase()) ||
        user!.email.toLowerCase().includes(query.toLowerCase());

      const matchesRole = role ? user.user_type === role : true;

      return matchesQuery && matchesRole;
    });
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  deleteUser(user: any) {
    const confirmDelete = confirm(`Delete ${user.name}?`);

    if (confirmDelete) {
      this._admin_ser.delete_user(user.id).subscribe({
        next: (res) => {
          alert(`user ${user.name} deleted successfully`);
          this.users = this.users.filter((u) => u !== user);
          this.onSearch();
        },
      });
    }
  }
  selectedUser: any = null;

  closeModal() {
    this.selectedUser = null;
  }
  openUser(user: any) {
    this.selectedUser = user;
  }
}
