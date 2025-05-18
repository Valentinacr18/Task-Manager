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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:4000/api/tasks').subscribe((data) => {
      this.tasks = data;
    });
  }

  filterByStatus(status: string) {
    return this.tasks.filter(task => task.status === status);
  }

  goToCreateTask() {
    this.router.navigate(['/create']);
  }
}