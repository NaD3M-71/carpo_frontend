import DOMPurify from 'dompurify'

// Mismo whitelist que el backend (ver backend/src/utils/sanitizeBio.ts):
// las etiquetas que produce el editor Trix por defecto. Se sanitiza también
// acá porque `bio` se renderiza en páginas públicas (ArqueroDetalle.tsx).
const ALLOWED_TAGS = [
  'div', 'br', 'p',
  'strong', 'b', 'em', 'i', 'del', 's', 'u',
  'a',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'h1'
]
const ALLOWED_ATTR = ['href', 'target', 'rel']

export const sanitizeBioHtml = (html: string | null | undefined) =>
  DOMPurify.sanitize(html ?? '', { ALLOWED_TAGS, ALLOWED_ATTR })
