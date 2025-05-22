# 🏟️ Full-Court

**Full-Court** es una aplicación web pensada para la **gestión de complejos deportivos** con múltiples canchas. Permite administrar reservas, productos y consumos de forma intuitiva, rápida y eficiente.

---

## 🚀 Funcionalidades principales

- 📅 **Reservas**: Visualización por fecha en formato grilla o lista. Reservas segmentadas por cancha y horario.
- 🔍 **Gestión de turnos**: Permite crear, cancelar y modificar reservas con selección de cancha, horario y cliente.
- 🛒 **Consumos asociados**: Agrega productos (agua, pelotas, café, etc.) a cada reserva.
- 📦 **Gestión de productos**: Stock, edición, eliminación y visualización clara.
- 📈 **Vista de estadísticas** (en desarrollo): Panel con métricas relevantes.
- 🌙 **Modo claro/oscuro**: Cambio de tema automático desde el store global.

---

## 🧱 Tecnologías utilizadas

- **Frontend**: React + Vite + TypeScript
- **UI**: TailwindCSS + shadcn/ui
- **Manejo de estado**: Zustand
- **Fechas**: date-fns
- **Routing**: React Router DOM
- **Mocking**: Hooks personalizados para generación de datos

---

## 📂 Estructura del proyecto (client)

```
src/
├── pages/            # Dashboard, Productos, Estadísticas
├── components/       # Componente de reservas, modales, etc.
├── hooks/            # useMock, useCalendar, useMobile, etc.
├── models/           # Tipos: Reservation, Court, Shift, etc.
├── stores/           # AppStore y gestión de estado global
├── lib/              # Funciones de formato y utilidades
├── shared/           # Layouts y elementos comunes
```

---

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/full-court.git
cd full-court

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

---

## 🎯 Roadmap futuro

- Autenticación de usuarios y control de acceso
- Exportación de reportes
- Integración con bases de datos reales (MongoDB, PostgreSQL)
- Vista para dispositivos móviles mejorada
- Notificaciones y recordatorios

---

## 👤 Autor

**Lautaro Fullone**  
Desarrollador Fullstack apasionado por construir productos funcionales con impacto.  
📫 [LinkedIn](https://www.linkedin.com/in/lautaro-fullone-77320a197/) | 📂 Proyecto personal

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.
