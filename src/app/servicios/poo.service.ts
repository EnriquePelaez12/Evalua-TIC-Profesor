import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InterfacePOO } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PooService {
  private pooCollection: AngularFirestoreCollection<InterfacePOO>
  private poo: Observable<InterfacePOO[]>;


  
  constructor(db:AngularFirestore) { 
    this.pooCollection = db.collection<InterfacePOO>('poo');
    this.poo = this.pooCollection.snapshotChanges().pipe(
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
    return this.poo = this.pooCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action =>{
        const data = action.payload.doc.data() as InterfacePOO;// sacamos el id del documento
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }


  getTodos(){
    return this.poo;
  }

  getTodo(id: string){
    return this.pooCollection.doc<InterfacePOO>(id).valueChanges();
  }

  updateTodo(poo:InterfacePOO, id: string){
    return this.pooCollection.doc(id).update(poo);
  }
  
  addTodo(poo: InterfacePOO){
    return this.pooCollection.add(poo);
  }
  
  removeTodo(id: string){
    return this.pooCollection.doc(id).delete();
  }

}

