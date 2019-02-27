import { Injectable } from '@angular/core';

@Injectable()

export class CkeditorConfigService {
    public getConfig () { 
        return {
            height: '250',
            extraPlugins: 'divarea',
            enterMode: '2',
            toolbar: [
              {name: 'clipboard', items: ['Undo', 'Redo']},
              {name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'NumberedList', 'BulletedList']},
              {name: 'insert', items: ['Image']},
              {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline']},
              {name: 'styles', items: ['Font', 'FontSize']},
              {name: 'colors', items: [ 'TextColor' ]},
            ]
        };
    };
}
