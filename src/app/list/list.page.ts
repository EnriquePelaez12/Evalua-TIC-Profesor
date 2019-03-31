import { AlumnoInterface } from './../models/alumno';
import { TodoService } from './../servicios/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  private alumnos: AlumnoInterface[];
  
  constructor(private todoService: TodoService) { }

//estamos usando otro metodo get para que aparesacan rapido los registros
  ngOnInit() {
    this.todoService.getAllAlumno().subscribe(alumnos => this.alumnos = alumnos);
 
  }
 
}
