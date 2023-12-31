import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Enrollment } from '../../models';
import { Role } from '../../../users/models/user.models';

@Component({
  selector: 'app-enrollments-list',
  templateUrl: './enrollments-list.component.html',
  styleUrls: ['./enrollments-list.component.scss'],
})
export class EnrollmentsListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input()
  dataSource!: MatTableDataSource<Enrollment>;

  @Output()
  deleteEnrollment = new EventEmitter<number>();

  @Output()
  editEnrollment = new EventEmitter<Enrollment>();

  @Input()
  userRole: Role = Role.USER;

  constructor() {}

  displayedColumns: string[] = [
    'id',
    'course',
    'student',
    'inscriptionDate',
    'actions',
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
