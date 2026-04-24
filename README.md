# SCM Servicios Informáticos — Sitio Web Corporativo
**Palpalá, Jujuy, Argentina**

---

## 🏢 Descripción del Proyecto
Sitio web corporativo para **SCM Servicios Informáticos**, empresa de seguridad electrónica, redes, hardware y software en Palpalá, Jujuy. Desarrollado como sitio estático con HTML, CSS y JavaScript puro, con integración a API de tablas para el portal de clientes.

---

## ✅ Funcionalidades Implementadas

### Página Principal (`index.html`)
- **Navbar fija** con logo SCM grande (135×135 px), sin tapar el ítem "Inicio"
- **Hero section** con canvas de partículas animadas, logo marca de agua y fondo navy/cyan
- **Ticker de noticias** animado
- **Sección Servicios**: 6 tarjetas (cámaras, redes, hardware, IA, alarmas, soporte)
- **Sección Nosotros** con contadores animados y estadísticas
- **Sección Marcas**: Hikvision, Dahua, IMOU, EZVIZ, TP-Link, Garnet, PPA
- **Catálogo de productos** con filtros por categoría (11 productos con imágenes reales)
- **Sección Equipo**: Misael, Carolina, Sergio con links directos a WhatsApp
- **Sección Contacto** con formulario que envía simultáneamente a los 3 integrantes
- **Sección Testimonios**: 12 testimonios reales de clientes satisfechos
- **Footer** completo con datos de contacto
- **Botón flotante WhatsApp**

### Portal de Clientes (`clientes.html`)
- **Registro de clientes** con hash SHA-256 + salt de email para contraseñas
- **Login** con verificación de credenciales
- **Dashboard** post-login con accesos rápidos
- **Persistencia de datos** vía API REST (`tables/clientes_scm`)
- **WhatsApp** desde el portal envía a los **3 integrantes simultáneamente**
- **Recuperación de contraseña** por WhatsApp (envía a los 3)

### Presupuesto (`presupuesto.html`)
- **Formulario de cotización** completo con validación
- **Selección de técnico** (Sergio / Misael / Carolina)
- **Envío WhatsApp** al técnico elegido **+ notificación automática a los otros 2**
- **Generación de PDF** (print-to-PDF)
- **Envío por email** (mailto)

### Catálogo Imprimible (`catalogo.html`)
- 4 páginas A4 con diseño profesional listo para imprimir/PDF
- Logos de marcas, imágenes reales de productos
- Secciones: Cámaras IP, Cámaras Analógicas, Grabadores/DVR, Redes, Alarmas, Biometría
- Datos de contacto del equipo en cada página

---

## 📱 Integración WhatsApp
Todos los puntos de contacto del sitio envían mensajes **simultáneamente** a los 3 integrantes:
| Nombre | Número | Rol |
|--------|--------|-----|
| Sergio | 5493884212364 | Técnico Instalador |
| Misael | 5493884845088 | Técnico Instalador |
| Carolina | 5493885191977 | Especialista IA & Seguridad |

---

## 🗄️ Base de Datos

### Tabla: `clientes_scm`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | text | UUID único del cliente |
| nombre | text | Nombre completo |
| email | text | Email (clave única de acceso) |
| telefono | text | Teléfono de contacto |
| localidad | text | Ciudad o barrio |
| empresa | text | Empresa u organización |
| password_hash | text | SHA-256 con salt de email |
| activo | bool | Estado de la cuenta |
| notas | rich_text | Notas internas |
| ultimo_login | text | Fecha del último acceso (ISO) |
| servicios_contratados | array | Lista de servicios |

**API REST Endpoints:**
- `GET tables/clientes_scm?search=<email>` — buscar cliente por email
- `POST tables/clientes_scm` — registrar nuevo cliente
- `PATCH tables/clientes_scm/<id>` — actualizar último login
- `DELETE tables/clientes_scm/<id>` — eliminar cuenta

---

## 🖼️ Imágenes de Productos Disponibles
| Archivo | Descripción |
|---------|-------------|
| `prod-cam-bullet-hikvision.jpg` | Cámara Bullet Hikvision 2MP |
| `prod-cam-dome-dahua.jpg` | Cámara Dome Dahua 4MP |
| `prod-cam-imou-cruiser.jpg` | Cámara WiFi IMOU Cruiser |
| `prod-cam-imou-ranger.jpg` | Cámara IMOU Ranger IA |
| `prod-cam-ezviz.jpg` | Cámara EZVIZ exterior |
| `prod-cam-ptz-hikvision.jpg` | Cámara PTZ Hikvision |
| `prod-cam-bullet-analog.jpg` | Cámara analógica bullet |
| `prod-cam-hikvision-dome4mp.jpg` | Dome Hikvision 4MP AcuSense |
| `prod-nvr-dahua.jpg` | NVR Dahua |
| `prod-nvr-dahua-8ch.jpg` | NVR Dahua 8 canales PoE |
| `prod-hdd-purple.jpg` | Disco duro vigilancia WD/Seagate |
| `prod-switch-poe.jpg` | Switch PoE 8 puertos |
| `prod-switch-tplink.jpg` | Switch TP-Link |
| `prod-router-tplink-ax55.jpg` | Router TP-Link AX55 |
| `prod-alarma-garnet.jpg` | Sistema alarma Garnet |
| `prod-alarma-garnet-panel.jpg` | Panel alarma Garnet PC-200 |
| `prod-biometrico.jpg` | Lector biométrico |

---

## 📁 Estructura de Archivos
```
index.html          — Página principal
catalogo.html       — Catálogo imprimible A4 (4 páginas)
presupuesto.html    — Generador de presupuestos
clientes.html       — Portal de clientes (login/registro)
README.md           — Documentación del proyecto
css/
  style.css         — Estilos principales (2200+ líneas)
js/
  main.js           — JavaScript principal
images/
  logo-scm-dark.png — Logo con fondo navy oscuro integrado
  logo-scm.png      — Logo original
  logo-*.png        — Logos de marcas (Hikvision, Dahua, IMOU, EZVIZ, TP-Link, Garnet, PPA)
  prod-*.jpg        — Imágenes de productos
```

---

## 🔗 Navegación Principal
| URL | Descripción |
|-----|-------------|
| `index.html` | Página principal |
| `index.html#inicio` | Hero section |
| `index.html#servicios` | Servicios ofrecidos |
| `index.html#nosotros` | Quiénes somos |
| `index.html#marcas` | Marcas partner |
| `index.html#catalogo` | Catálogo de productos |
| `index.html#equipo` | Equipo técnico |
| `index.html#contacto` | Formulario de contacto |
| `catalogo.html` | Catálogo imprimible PDF |
| `presupuesto.html` | Formulario de presupuesto |
| `clientes.html` | Portal de clientes |

---

## 🎨 Paleta de Colores
- **Navy** `#0d1b2a` — Fondo principal
- **Navy medio** `#1a3a6b` — Fondos secundarios
- **Cyan** `#00c8ff` — Color de acento, botones, links
- **Blanco** `#ffffff` — Textos principales
- **Verde WhatsApp** `#25d366` — Botones de WhatsApp

---

## 📍 Datos de Contacto del Negocio
- **Dirección:** Bº Gral. Savio, Leandro Alem 263, Palpalá, Jujuy
- **Email:** scmserviciosinformaticos01@gmail.com
- **Teléfonos:** 3884-212364 / 3884-845088 / 3885-191977

---

## 🚀 Para Publicar
Para desplegar el sitio en línea, usá la pestaña **Publish** del entorno de desarrollo. La publicación es automática con un clic.

---

## 📝 Próximos Pasos Recomendados
1. Agregar imágenes reales del equipo (fotos de Misael, Carolina, Sergio)
2. Conectar formulario de contacto a un servicio de email (ej: EmailJS o Formspree)
3. Agregar sección de blog/noticias de seguridad informática
4. Integrar Google Analytics para métricas de visitas
5. Agregar más productos al catálogo según disponibilidad de stock
6. Implementar panel de administración para ver clientes registrados
7. Agregar sistema de tickets de soporte técnico para clientes
