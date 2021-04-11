import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule, NbSpinnerModule,
  NbRadioModule, NbInputModule,
} from '@nebular/theme';
import { LoaderComponent } from './component/loader/loader.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbSpinnerModule,
    NbRadioModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbSpinnerModule,
    LoaderComponent,
    NbRadioModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
