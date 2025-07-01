import { CommonModule } from '@angular/common';
import {
  Component,
  Renderer2,
  AfterViewInit,
  viewChild,
  ElementRef,
  DoCheck
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MonacoEditorConstructionOptions,
  MonacoEditorComponent,
  MonacoEditorModule,
  MONACO_PATH,
} from '@materia-ui/ngx-monaco-editor';
import { DarkModeService } from '../dark-mode-service';
@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: MONACO_PATH,
      useValue: 'assets/monaco-editor',
    },
  ],
  // providers: [
  //   provideMonacoEditor(monacoConfig)
  // ],

  templateUrl: './code.html',
  styleUrl: './code.scss',
})
export class Code implements AfterViewInit,DoCheck {
  constructor(private rerender: Renderer2,private DarkModeServices:DarkModeService) {
  }
  readonly monacoComponent = viewChild.required(MonacoEditorComponent);
  readonly previewElement = viewChild.required<ElementRef>('preview');
  onChangeDropdownValue: string = 'html';
  HTMLeditorOptions: MonacoEditorConstructionOptions = {
    language: 'html', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs', // vs, vs, hc-black
    automaticLayout: true,
  };
  previewPage:boolean=false;
  cssCode: string = '';
  jsCode: string = '';
  htmlCode: string = `

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
`;
  csseditorOptions: MonacoEditorConstructionOptions = {
    language: 'css',
    theme: 'vs', // vs, vs, hc-black
    automaticLayout: true,
  };
  jsEditorOptions: MonacoEditorConstructionOptions = {
    language: 'javascript',
    theme: 'vs', // vs, vs, hc-black
    automaticLayout: true,
  };

  ngAfterViewInit(): void {}
  ngDoCheck(): void {
            try{
      if(this.DarkModeServices.isDark)
     {
      this.HTMLeditorOptions={...this.HTMLeditorOptions,theme:'vs-dark'}
      this.csseditorOptions={...this.csseditorOptions,theme:'vs-dark'}
      this.jsEditorOptions={...this.jsEditorOptions,theme:'vs-dark'}
    }
    else{
      this.HTMLeditorOptions={...this.HTMLeditorOptions,theme:'vs'}
      this.csseditorOptions={...this.csseditorOptions,theme:'vs'}
      this.jsEditorOptions={...this.jsEditorOptions,theme:'vs'}
    }
    }
    catch(error){
      console.log(error)
    }
  }
  previewHTML() {

    try {
      const iframe = document.createElement('iframe');
      iframe.style.width = 'auto';
      iframe.style.height = 'auto';

      // Clear previous preview
      const previewElement = this.previewElement();
      previewElement.nativeElement.innerHTML = '';
      previewElement.nativeElement.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
        <html>
          <head>
            <style>${this.cssCode}</style>
          </head>
          <body>
            ${this.htmlCode}
            <script>${this.jsCode}<\/script>
          </body>
        </html>
      `);
        doc.close();
      }
    } catch (error) {
      console.error('Preview error:', error);
    }
  }
}
