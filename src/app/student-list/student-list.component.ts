// src/app/student-list/student-list.component.ts
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
[x: string]: any;
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  editStudent(student:any){
    this['router'].navigate(['/student-form'], {state: {student}});
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.getStudents();
      });
    }
  }
}
