// src/app/student-form/student-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-form',
  standalone: true,
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  imports: [ReactiveFormsModule],
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      studentId: [''],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      dob: ['', [Validators.required, this.validateAge]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)]],
      gender: ['', Validators.required],
      course: ['', Validators.required],
      yearOfEnrollment: ['', [Validators.required, this.validateYear]],
      department: ['', Validators.required],
      cgpa: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      address: ['', Validators.maxLength(500)]
    });
  }

  validateAge(control: { value: string | number | Date; }) {
    const age = new Date().getFullYear() - new Date(control.value).getFullYear();
    return age >= 18 ? null : { ageInvalid: true };
  }

  validateYear(control: { value: number; }) {
    const currentYear = new Date().getFullYear();
    return control.value <= currentYear ? null : { yearInvalid: true };
  }

  submitForm() {
    if (this.studentForm.valid) {
      this.studentService.createStudent(this.studentForm.value).subscribe();
    }
  }
}
