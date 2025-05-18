import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private http: HttpClient
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['pending', Validators.required],
      userId: ['', Validators.required] // Usuario seleccionado desde el <select>
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:4000/api/users').subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: () => {
          alert('Task created successfully!');
          this.taskForm.reset({ status: 'pending' });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating task:', err);
          alert('Failed to create task.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}