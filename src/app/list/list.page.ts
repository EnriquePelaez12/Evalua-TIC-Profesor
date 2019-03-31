import { AlumnoInterface } from './../models/alumno';
import { TodoService } from './../servicios/todo.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  private alumnos: AlumnoInterface[];
  
  constructor(private todoService: TodoService,
    private nav: NavController,
    private loadingController: LoadingController) { }

//estamos usando otro metodo get para que aparesacan rapido los registros
  ngOnInit() {
    this.loadTodo();//se manda a llamar todo el proceso para que aparesca el grid de cargando
  }

  //se crea el metodo para cargar
  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();//se inicia el metodo
      this.todoService.getAllAlumno().subscribe((alumnos) =>{
      loading.dismiss();//se para el metodo una ves cargado los datos
      this.alumnos = alumnos;
  });
}

 
}
