import { NavController, LoadingController } from '@ionic/angular';
import { PooService } from './../../../servicios/poo.service';
import { Component, OnInit } from '@angular/core';
import { InterfacePOO } from 'src/app/models/pregunta';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {

  poos: InterfacePOO[];

  constructor(
    private pooService: PooService,
    private nav: NavController,
    private loadingController: LoadingController) { }

  ngOnInit(){
    this.loadTodo();//se manda a llamar todo el proceso para que aparesca el grid de cargando
  }

//se crea el metodo para cargar
  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();//se inicia el metodo
    this.pooService.getAllAlumno().subscribe((poos) =>{
      loading.dismiss();//se para el metodo una ves cargado los datos
     this.poos = poos;
   
    
    });
  }


}
