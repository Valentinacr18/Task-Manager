import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['pending', Validators.required],
      userId: [1, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: () => {
          alert('Task created successfully!');
          this.taskForm.reset({ status: 'pending', userId: 1 });
        },
        error: (err) => {
          console.error('Error creating task:', err);
          alert('Failed to create task.');
        }
      });
    }
  }
}
