import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent {
  file: FileItem = {
    id: '',
    name: '',
    creation: new Date(),
    type: FileType.FILE,
    owners: [],
    chequeado: false
  };

  @Input() duenios: FileOwner[] = [];
  fileTypes = Object.values(FileType);
  @Output() formEmitido = new EventEmitter<FileItem>();

  duenioTemporal: FileOwner = {
    avatarUrl: "",
    name: ""
  };

  ngOnInit(): void {
    this.file.owners = [];
    this.crearId();
  }

  crearId() {
    const timestamp = new Date().getTime();
    const numeroRandom = Math.floor(Math.random() * 1000);
    this.file.id = `${timestamp}-${numeroRandom}`;
  }

  agregarDuenio() {
    let existe = false;

    if (this.duenioTemporal.name == "") {
      Swal.fire({
        title: "Seleccione un dueño para agregar",
        icon: "warning",
        confirmButtonText: "Ok"
      });
    }
    else {
      this.file.owners.forEach(o => {
        if (o === this.duenioTemporal) {
          existe = true;
        }
      });

      if (existe == false) {
        this.file.owners.push(this.duenioTemporal);
        Swal.fire({
          title: "Dueño agregado!",
          icon: "success",
          confirmButtonText: "Ok"
        });
      } else {
        Swal.fire({
          title: "Ese dueño ya está agregado",
          icon: "warning",
          confirmButtonText: "Ok"
        });
      }
    }
  }

  validateFecha(date: Date): boolean {
    const fechaSeleccionada = new Date(date);
    const hoy = new Date();
    const unAnioAtras = new Date();
    unAnioAtras.setFullYear(hoy.getFullYear() - 1);
    if (fechaSeleccionada > unAnioAtras) {
      return false;
    }
    return true;
  }

  enviarFormulario(form: NgForm) {

    if (!this.validateFecha(this.file.creation)) {
      Swal.fire({
        title: "La fecha debe ser de mínimo, un año atrás",
        icon: "error",
        confirmButtonText: "Ok"
      });
    }
    else if (this.file.owners.length == 0) {
      Swal.fire({
        title: "Debe seleccionar, mínimo un dueño",
        icon: "error",
        confirmButtonText: "Ok"
      });
    } else if ((this.file.type.toString() !== "FOLDER") && (this.file.type.toString() !== "FILE")) {
      Swal.fire({
        title: "Debe seleccionar un tipo de archivo",
        icon: "error",
        confirmButtonText: "Ok"
      });
    } else {
      console.log(this.file.creation);
      console.log(this.file.name);
      console.log(this.file.type);
      this.file.owners.forEach(o => {
        console.log(o.name);
      });
      console.log(this.file.id);

      Swal.fire({
        title: "Archivo creado!",
        icon: "success",
        confirmButtonText: "Ok"
      });
      this.formEmitido.emit(this.file);
    }
  }

}
