import React from 'react';
import { EditorProps } from './type';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyUploadAdapter } from 'common/adapter';
import './style.css';

const cutTagHtml = (str: string) => {
  let newStr;
  newStr = str.replace('/(<)([ws]+)(>)/g', ' ');
  newStr = str.replace('/(</)([ws]+)(>)/g', ' ');
  return newStr;
};

export const RichEditor = ({ data, hintText, handleChange }: EditorProps) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data || ''}
      config={{
        placeholder: hintText,

        toolbar: {
          items: [
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'highlight',
            '|',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            '|',
            'indent',
            'outdent',
            '|',
            'todoList',
            'code',
            'CodeBlock',
            'link',
            'blockQuote',
            'imageUpload',
            'insertTable',
            'MediaEmbed',
            'MediaEmbedToolbar',
            '|',
            'undo',
            'redo',
          ],
        },
        language: 'en',
        alignment: {
          options: ['left', 'right'],
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
        licenseKey: '',
        image: {
          toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            '|',
            'imageResize',
            '|',
            'imageTextAlternative',
          ],
          // The default value.
          styles: ['full', 'side', 'alignLeft', 'alignCenter', 'alignRight'],
          upload: {
            panel: {
              items: ['insertImageViaUrl'],
            },
          },
          resizeOptions: [
            {
              name: 'imageResize:original',
              label: 'Original',
              value: null,
            },
            {
              name: 'imageResize:50',
              label: '50%',
              value: '50',
            },
            {
              name: 'imageResize:75',
              label: '75%',
              value: '75',
            },
          ],
        },
      }}
      onReady={(editor: any) => {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
          console.log(loader);
          return new MyUploadAdapter(loader);
        };
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        handleChange(cutTagHtml(data));
      }}
    />
  );
};
