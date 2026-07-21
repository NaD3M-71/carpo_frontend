import type * as React from 'react'

declare module 'trix' {}

interface TrixDocument {
  toString(): string
}

interface TrixEditorInstance {
  getDocument(): TrixDocument
}

declare global {
  interface HTMLElement {
    editor?: TrixEditorInstance
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'trix-editor': React.ClassAttributes<HTMLElement> & {
          input?: string
          placeholder?: string
          toolbar?: string
          class?: string
        }
      }
    }
  }
}
