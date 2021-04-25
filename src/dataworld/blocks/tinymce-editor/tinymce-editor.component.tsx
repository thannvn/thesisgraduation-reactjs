import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
  setValues: (change: string) => void,
  values: string,
  height: number
}

export default function TinyMCEEditor(props: TinyMCEEditorProps) {
  const { setValues, height, values } = props

  const handleEditorChange = (currentContent: string, editor: any) => {
    setValues(currentContent)
  }

  return (
    <>
      <Editor
        apiKey="nk9oepw03pa30b9xtpvicomyk4o56i71w4ge601a0f6sc835"
        value={values}
        init={{
          height: height,
          menubar: false,
          plugins: [
            ' spellchecker,insertdatetime,directionality,fullscreen,noneditable,visualchars,nonbreaking,template, hr',
            'advlist autolink lists link image charmap print preview anchor pagebreak codesample ',
            'searchreplace visualblocks  fullscreen ',
            'insertdatetime media table paste  help wordcount save emoticons ',
          ],
          toolbar:
            `undo redo | hr |fontselect fontsizeselect formatselect | bold italic backcolor| 
            alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  
            link anchor | print preview  fullscreen  | 
            forecolor backcolor charmap emoticons| checklist pagebreak  | help`,
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  )
}