import { Component, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: 'filebutton',
    template: '<input #input (change)="inputChange($event)" type="file">',
    styles: ['input { margin-top:8px; }']
})
export class FileButtonComponent {
    @ViewChild('input') input: ElementRef;

    _file: File;
    _requiredIf:any;

    @Input()
    public get fileModel() {
        return this._file;
    }

    public set fileModel(file: File) {
        this._file = file;
        if (!file) {
            this.input.nativeElement.value = '';
        }
    }

    @Output()
    fileModelChange = new EventEmitter();

   @Input()
    public get requiredIf() {
        return this._requiredIf;
    }

    public set requiredIf(condition: any) {
        this._requiredIf = condition;
        this.input.nativeElement.required = new Boolean(condition);
    }

    inputChange(event: Event) {
        var files = this.input.nativeElement.files;
        if (files.length > 0) {
            this.fileModelChange.emit(files[0]);
        } else {
            this.fileModelChange.emit(null);
        }
    }

}
