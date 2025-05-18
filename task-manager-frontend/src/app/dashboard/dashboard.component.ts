import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:4000/api/tasks').subscribe((data) => {
      this.tasks = data;
    });

    this.http.get<any[]>('http://localhost:4000/api/users').subscribe((data) => {
      this.users = data;
    });
  }

  filterByStatus(status: string) {
    return this.tasks.filter(task => task.status === status);
  }

  getUserNameById(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }

  getUserEmailById(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.email : 'No email';
  }

  goToCreateTask() {
    this.router.navigate(['/create']);
  }
}