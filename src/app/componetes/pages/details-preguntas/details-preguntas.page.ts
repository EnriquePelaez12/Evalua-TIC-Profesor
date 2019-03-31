import { PooService } from './../../../servicios/poo.service';
import { Component, OnInit } from '@angular/core';
import { InterfacePOO } from 'src/app/models/pregunta';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-details-preguntas',
  templateUrl: './details-preguntas.page.html',
  styleUrls: ['./details-preguntas.page.scss'],
})
export class DetailsPreguntasPage implements OnInit {

  poo:InterfacePOO = {
    pregunta: '',
    respuesta: ''
  };
  
  todoId= null;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private todoService: PooService, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Cargando.....'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(todo => {
      loading.dismiss();;
      this.poo = todo;
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateTodo(this.poo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/preguntas');
      });
    } else {
      this.todoService.addTodo(this.poo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/preguntas');
      });
    }
  }
  async onRemoveTodo(idTodo:string) {
    this.todoService.removeTodo(idTodo);
    this.nav.navigateForward('/preguntas');
  }
}
