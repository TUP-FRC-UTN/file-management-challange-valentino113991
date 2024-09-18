import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem, FileType, FileOwner } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, FormularioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: FileItem[] = FILE_LIST;
  title = 'file-management';
  numbers: number[] = [0, 1, 2]
  mostrarForm: boolean = false;


  ngOnInit(): void {
    //this.pasarDuenios();
    this.files.sort((a, b) => a.name.localeCompare(b.name));
    this.files.sort((a, b) => a.type - b.type);
    this.files.forEach(file => {
      file.chequeado = false;
    });
  }

  mostrar(){
    this.mostrarForm = !this.mostrarForm;
  }

  agregarArchivo(file: FileItem){
    this.files.push(file);
    this.mostrar();
  }

  pasarDuenios(){
    const dueniosUnicos = new Set<FileOwner>();

    this.files.forEach(file => {
      file.owners.forEach(o => {
          dueniosUnicos.add(o);
      });
    });
    return  Array.from(dueniosUnicos)
  }

  achicarNombre(nombre: string){
    if(nombre.length > 10){
      nombre = nombre.slice(0, 10);
      nombre = nombre.concat("...");
      return nombre;
    }
    return nombre;
  }

  seleccionar(id: string){
    this.files.forEach(file => {
      if(file.id == id){
        file.chequeado = !file.chequeado;
      }
    });
  }

  borrar(){
    let contador = 0
    this.files.forEach(file => {
      if(file.chequeado == true){
        contador ++;
      }
    });
    if(contador > 1){
      Swal.fire({
        title: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.files = this.files.filter(file => file.chequeado == false);
        }
      });
    }else{
      this.files = this.files.filter(file => file.chequeado == false);
    }
  }
}
