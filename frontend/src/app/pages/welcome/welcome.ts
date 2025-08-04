import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzDividerModule],
  templateUrl: './welcome.html',
})
export class Welcome {
  dataSet = [
    { name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  ];
}