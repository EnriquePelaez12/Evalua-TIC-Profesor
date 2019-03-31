import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlumnoInterface } from './../models/alumno';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<AlumnoInterface>;
  private todos: Observable<AlumnoInterface[]>;

  constructor(db:AngularFirestore) { 
    this.todosCollection = db.collection<AlumnoInterface>('profesores');
    
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }


  getAllAlumno(){
    //this.alumnosCollection = this.afs.collection<AlumnoInterface>('alumnos');
    return this.todos = this.todosCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action =>{
        const data = action.payload.doc.data() as AlumnoInterface;// sacamos el id del documento
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }


  getTodos(){
    return this.todos;
  }

  getTodo(id: string){
    return this.todosCollection.doc<AlumnoInterface>(id).valueChanges();
  }

  updateTodo(todo:AlumnoInterface, id: string){
    return this.todosCollection.doc(id).update(todo);
  }
  
  addTodo(todo: AlumnoInterface){
    return this.todosCollection.add(todo);
  }
  
  removeTodo(id: string){
    return this.todosCollection.doc(id).delete();
  }

}

