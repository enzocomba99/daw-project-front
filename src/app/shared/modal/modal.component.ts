import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}){
    
  }
  onNoClick(): void {
    this.dialogRef.close('No'); // Cierra el diálogo y pasa 'No' como resultado
  }

  onYesClick(): void {
    this.dialogRef.close('Si'); // Cierra el diálogo y pasa 'Si' como resultado
  }



  
}
