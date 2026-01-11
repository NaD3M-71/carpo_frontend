# Frontend – Sistema CARPO

Este repositorio contiene el **frontend** del sistema CARPO, una aplicación web desarrollada para la gestión de arqueros, torneos y contenidos del club.

La aplicación está construida con **React + TypeScript** y utiliza un backend propio para autenticación, gestión de usuarios y datos persistentes.

---

## 🧩 Tecnologías utilizadas

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Context API (Auth)

---

## 📦 Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/tu-repo/frontend-carpo.git
```

2. Instalar dependencias

```bash
npm install
```

3. Crear archivo de variables de entorno

```bash
cp .env.example .env
```

Configurar la URL del backend:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Levantar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## 🔐 Autenticación y roles

El frontend utiliza un **AuthContext** para manejar la sesión del usuario.

Información disponible en el contexto:

* `user`: datos básicos del usuario autenticado
* `token`: JWT almacenado en `localStorage`

### Roles soportados

* USER (arquero normal)
* ADMIN
* SUPERADMIN

Algunas funcionalidades están restringidas únicamente a usuarios administradores.

---

## 🏹 Perfil de arquero

El perfil del arquero se obtiene desde el backend mediante el endpoint:

```
GET /arqueros/:id
```

Esto se realiza porque el objeto `user` del contexto de autenticación contiene solo información mínima.

El perfil muestra:

* Datos personales
* Datos deportivos (tipo de arco, categoría, lateralidad, etc.)
* Biografía (opcional)

Si el arquero no posee biografía, se muestra un mensaje alternativo con tono informal.

---

## 🖼️ Galería de fotos

La sección de galerías permite visualizar enlaces a carpetas de Google Drive con fotos de torneos y eventos.

### Comportamiento según rol

* Usuarios normales:

  * Visualizan las galerías

* Administradores:

  * Crear nuevas galerías
  * Editar galerías existentes
  * Eliminar galerías

Actualmente, las galerías se gestionan **en memoria (frontend)** y no persisten tras recargar la página.

La interfaz de administración se realiza mediante un **modal reutilizable** dentro del mismo componente.

---

## 🧱 Estructura general del proyecto

```
src/
├── api/            # Funciones de conexión al backend
├── components/     # Componentes reutilizables
├── context/        # Contextos globales (Auth)
├── pages/          # Vistas principales
├── types/          # Tipos TypeScript
├── utils/          # Utilidades
└── main.tsx
```

---

## 🚧 Estado del proyecto

El frontend se encuentra en desarrollo activo.

Funcionalidades futuras previstas:

* Persistencia de galerías en backend
* Edición de perfil de arquero
* Mejoras de UX/UI
* Internacionalización

---

## 🧠 Notas finales

Este proyecto está pensado como una base sólida y escalable. Muchas decisiones priorizan claridad, mantenibilidad y velocidad de desarrollo por sobre la complejidad innecesaria.

Si algo parece simple, probablemente lo sea a propósito 😉
