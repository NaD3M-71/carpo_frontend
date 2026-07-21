import { useEffect, useId, useRef } from 'react'
import 'trix'
import 'trix/dist/trix.css'

interface TrixEditorProps {
  name: string
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

// Wrapper de React para el editor Trix (https://trix-editor.org/), un web
// component. Trix no soporta ser "controlado": carga su contenido inicial
// del <input type="hidden"> asociado al montarse y a partir de ahí maneja
// su propio DOM, por eso solo se usa `value` como valor inicial.
const TrixEditor = ({ name, value, onChange, placeholder }: TrixEditorProps) => {
  const inputId = useId()
  const editorRef = useRef<HTMLElement>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const handleChange = () => {
      const document = editor.editor?.getDocument()
      const isEmpty = !document || document.toString().trim().length === 0
      onChangeRef.current(isEmpty ? '' : editor.innerHTML)
    }

    // No hay backend de subida de archivos para adjuntos de la biografía,
    // así que se bloquean explícitamente (el botón ya se oculta por CSS).
    const blockAttachments = (e: Event) => e.preventDefault()

    editor.addEventListener('trix-change', handleChange)
    editor.addEventListener('trix-attachment-add', blockAttachments)

    return () => {
      editor.removeEventListener('trix-change', handleChange)
      editor.removeEventListener('trix-attachment-add', blockAttachments)
    }
  }, [])

  return (
    <div className="trix-wrapper">
      <input id={inputId} type="hidden" name={name} defaultValue={value} />
      <trix-editor
        ref={editorRef}
        input={inputId}
        placeholder={placeholder}
        class="trix-content"
      />
    </div>
  )
}

export default TrixEditor
