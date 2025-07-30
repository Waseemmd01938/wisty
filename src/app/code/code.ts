import { CommonModule } from '@angular/common';
import {
  Component,
  Renderer2,
  AfterViewInit,
  ViewChild,
  ElementRef,
  DoCheck,
  OnInit,
  viewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MonacoEditorConstructionOptions,
  MonacoEditorComponent,
  MonacoEditorModule,
  MONACO_PATH,
} from '@materia-ui/ngx-monaco-editor';
import { DarkModeService } from '../dark-mode-service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../spinner/spinner-service';
@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule
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

export class Code implements AfterViewInit, DoCheck, OnInit {
  codeEditorValue:string='';
  modeSelection: string = 'website';
  codeEditorDropdown: string = '';
  baseUrl="https://emkc.org/api/v2/piston"

  runtimeResponseList:any[]=[]
  readonly monacoComponent = viewChild.required(MonacoEditorComponent);
  readonly previewElement = viewChild.required<ElementRef>('preview');
  @ViewChild('terminal', { static: false }) terminalView!: ElementRef;
  // readonly terminalView= viewChild.required<ElementRef>('terminal');
  onChangeDropdownValue: string = 'html';
  HTMLeditorOptions: MonacoEditorConstructionOptions = {
    language: 'html', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs', // vs, vs, hc-black
    automaticLayout: true,
  };
  previewPage: boolean = false;
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
  editorOptionsForCodeEditor: MonacoEditorConstructionOptions = {
    automaticLayout: true
  }
  constructor(private rerender: Renderer2, private DarkModeServices: DarkModeService,private http:HttpClient,private spinner:SpinnerService) {
  }
  ngOnInit(): void {
    let executedRuntime=this.http.get(this.baseUrl+'/runtimes')
    this.spinner.show()
    executedRuntime.subscribe((res:any)=>{
      this.runtimeResponseList=res
      this.spinner.hide()
    })

    // this.terminal = new Terminal(
    //   {
    //     theme: {
    //       background: '#1e1e1e', // match Monaco vs-dark
    //     }
    //   }
    // );
    // let terminalView = this.terminalView
    // console.log("this.terminal",this.terminal)
    // console.log("this.terminalView", this.terminalView)
    // this.terminal.open(terminalView?.nativeElement)
  }
  ngAfterViewInit(): void { }
  ngDoCheck(): void {
    try {
      if (this.DarkModeServices.isDark) {
        this.HTMLeditorOptions = { ...this.HTMLeditorOptions, theme: 'vs-dark' }
        this.csseditorOptions = { ...this.csseditorOptions, theme: 'vs-dark' }
        this.jsEditorOptions = { ...this.jsEditorOptions, theme: 'vs-dark' }
        this.editorOptionsForCodeEditor = { ...this.editorOptionsForCodeEditor, theme: 'vs-dark' }
      }
      else {
        this.HTMLeditorOptions = { ...this.HTMLeditorOptions, theme: 'vs' }
        this.csseditorOptions = { ...this.csseditorOptions, theme: 'vs' }
        this.jsEditorOptions = { ...this.jsEditorOptions, theme: 'vs' }
        this.editorOptionsForCodeEditor = { ...this.editorOptionsForCodeEditor, theme: 'vs' }
      }
    }
    catch (error) {
      console.log(error)
    }
    if (['javascript', 'typescript', 'python'].includes(this.codeEditorDropdown) && this.modeSelection == 'code') {
      this.editorOptionsForCodeEditor = { ...this.editorOptionsForCodeEditor, language: this.codeEditorDropdown }
    }
  }
  previewHTML() {
    try {
      const iframe = document.createElement('iframe');
      iframe.classList.add('row')
      iframe.classList.add('col-12')
      iframe.classList.add('h-100')
      // iframe.classList.add('website-preview')
      // Clear previous preview
      const previewElement = this.previewElement();
      previewElement.nativeElement.innerHTML = '';
      previewElement.nativeElement.appendChild(iframe);
      let GlbalStyle = `
      *{
      background-color: white;
      }
      `
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
        <html>
          <head>
            <style>${GlbalStyle + this.cssCode}</style>
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

runCode() {
  let codeValue=this.codeEditorValue
  let version=''
  for(let code of this.runtimeResponseList)
  {
    if (code.language ==this.codeEditorDropdown) version=code.version
  }
  let requestBody={
  "language": this.codeEditorDropdown,
  "version": version,
  "files": [
    {
      "content": codeValue
    }
  ],
}
this.spinner.show()
this.http.post(`${this.baseUrl}/execute`,requestBody).subscribe((res:any)=>{
  console.log(res)
  let child=document.createElement('div')
  let output= res?.run?.output
  let error=res?.run?.stderr
  let errorchild=`
  <div style="color:red">
  ${error}
  </div>
  `
  child.innerHTML=(output !==error) ?`
 <div class="mb-2 mt-2">
  Executed in ${this.codeEditorDropdown} ....
  </div>
  >  ${output}` :errorchild;
  this.rerender.appendChild(this.terminalView.nativeElement,child)
  this.spinner.hide()
},error=>{
  this.spinner.hide()
})
}
clearTerminal()
{
  this.terminalView.nativeElement.innerHTML=""
}

}
