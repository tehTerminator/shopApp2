import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../class/template';
import { SqlService } from '../../services/sql.service';
@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  searchText = '';
  @Output() templateEmitter = new EventEmitter<Template>();
  private arrTemplates: Array<Template> = [];

  constructor(private sql: SqlService) { }

  ngOnInit() {
    this.onRefresh();
  }

  get templates(): Array<Template> {
    return this.arrTemplates;
  }

  select(temp: Template) {
    this.templateEmitter.emit(temp);
  }

  onRefresh() {
    this.sql.select('template')
    .subscribe((res: Array<Template>) => {
      res.forEach((t: Template) => {
        this.arrTemplates.push(new Template(t.id, t.title, t.rate));
      });
    });
  }
}
