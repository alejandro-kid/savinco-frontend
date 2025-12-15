# Savinco Frontend - Financial Data Management

Aplicación frontend para la gestión de datos financieros por país, construida con React, TypeScript y arquitectura hexagonal/DDD.

## 📋 Descripción del Proyecto

Esta aplicación permite gestionar datos financieros de diferentes países (Ecuador, España, Perú, Nepal), con conversión automática a USD y visualización de resúmenes consolidados.

### Funcionalidades Principales

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar datos financieros por país
- ✅ **Listado**: Visualización de todos los datos financieros con valores convertidos a USD
- ✅ **Resumen Consolidado**: Totales globales y desglose por país
- ✅ **Validación**: Validación client-side y server-side
- ✅ **Gestión de Estado**: Cache inteligente con Redux para optimizar rendimiento

## 🏗️ Arquitectura

El proyecto sigue **Arquitectura Hexagonal (Ports & Adapters)** con principios de **Domain-Driven Design (DDD)** y **Vertical Slicing**.

### Estructura de Capas

```bash
Presentation → Application → Domain ← Infrastructure
```

**Principio fundamental**: El dominio es el centro y no conoce nada sobre React, Redux o HTTP.

### Estructura de Módulos

```bash
src/
├── modules/
│   └── financial-data/          # Módulo principal (Vertical Slice)
│       ├── domain/               # Lógica de negocio pura
│       ├── application/          # Casos de uso (orquestación)
│       ├── infrastructure/      # Adaptadores (HTTP, Redux)
│       └── presentation/         # UI (Componentes, Hooks, Páginas)
├── shared/                       # Código compartido
│   ├── http/                     # Cliente HTTP base
│   ├── redux/                    # Configuración Redux
│   └── ui/                       # Componentes UI reutilizables
└── App.tsx                       # Punto de entrada
```

### Decisiones Arquitectónicas

#### Gestión de Estado

- **Redux Toolkit**: Para estado compartido y cache
- **Optimistic Updates**: Solo en DELETE (mejor UX, fácil rollback)
- **Cache Inteligente**: Evita llamadas innecesarias a GET all y summary

#### Operaciones

- **COMMANDS** (POST, PUT, DELETE): Esperan respuesta del backend (validación crítica)
- **QUERIES** (GET): Cachean resultados en Redux para evitar múltiples llamadas

#### Fuente de Datos

- **Backend REST API**: Todos los datos provienen del API
- **Redux Store**: Cache para optimizar rendimiento

## 🛠️ Stack Tecnológico

### Core

- **React 19** - Biblioteca UI
- **TypeScript 5.9** - Tipado estático
- **Rsbuild** - Build tool (basado en Rspack)

### Estado y HTTP

- **Redux Toolkit** - Gestión de estado
- **React Redux** - Integración React-Redux
- **Axios** - Cliente HTTP

### Routing

- **React Router DOM** - Navegación

### Testing

- **React Testing Library** - Testing de componentes
- **Jest** - Test runner

## 📡 API Backend

El frontend consume la API REST documentada en `API_DOCUMENTATION.md`.

### Endpoints Implementados

1. `GET /api/v1/health` - Health check
2. `POST /api/v1/financial-data` - Crear datos financieros
3. `GET /api/v1/financial-data` - Listar todos los datos
4. `GET /api/v1/financial-data/{countryCode}` - Obtener por país
5. `GET /api/v1/financial-data/summary` - Resumen consolidado
6. `PUT /api/v1/financial-data/{countryCode}` - Actualizar datos
7. `DELETE /api/v1/financial-data/{countryCode}` - Eliminar datos

**Base URL**: `http://localhost:8080` (configurable)

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (versión compatible con el proyecto)
- pnpm (gestor de paquetes)

### Instalación

```bash
# Instalar dependencias
pnpm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Build

```bash
# Construir para producción
pnpm run build
```

### Preview

```bash
# Previsualizar build de producción
pnpm run preview
```

## 📁 Estructura del Proyecto

### Domain Layer (`modules/financial-data/domain/`)

- **Tipos**: Entidades de dominio (`FinancialData`, `CountryCode`, `CurrencyCode`)
- **Factory Functions**: Creación de entidades con validación
- **Validaciones**: Reglas de negocio puras
- **Repository Interface**: Contrato del repositorio

### Application Layer (`modules/financial-data/application/`)

- **Use Cases**: Orquestación de lógica de negocio
  - `createFinancialDataUseCase`
  - `updateFinancialDataUseCase`
  - `deleteFinancialDataUseCase`
  - `getAllFinancialDataUseCase`
  - `getByCountryUseCase`
  - `getSummaryUseCase`

### Infrastructure Layer (`modules/financial-data/infrastructure/`)

- **HTTP Client**: Cliente API REST
- **DTOs**: Data Transfer Objects para requests/responses
- **Mappers**: Transformación DTO ↔ Domain
- **Redux**: Slice, actions, selectors
- **Repository**: Implementación del repositorio

### Presentation Layer (`modules/financial-data/presentation/`)

- **Hooks**: Custom hooks para casos de uso
- **Components**: Componentes React reutilizables
- **Pages**: Páginas de la aplicación

## 🎨 Páginas de la Aplicación

1. **Home** (`/`)
   - Muestra los datos consolidados del anexo
   - Cards visuales para métricas globales:
     - Capital Ahorrado Total
     - Capital Prestado Total
     - Utilidades Generadas Totales
   - Diseño responsive y enfoque en visualización rápida

2. **Dashboard de Administración** (`/dashboard`)
   - Tabla con todos los países y sus datos financieros
   - Formulario para crear/editar registros
   - Acciones: Editar, Eliminar, Ver detalle
   - Confirmación antes de eliminar y mensajes de éxito/error

3. **Sub‑rutas / flujos específicos (nomenclatura interna del front)**
   - `FinancialDataListPage` — lista principal (implementa el Dashboard)
   - `FinancialDataCreatePage` — flujo/route de creación (p. ej. `/dashboard/create`)
   - `FinancialDataEditPage` — flujo/route de edición (p. ej. `/dashboard/edit/:countryCode`)
   - `FinancialDataSummaryPage` — vista resumen consolidado (p. ej. `/summary` o integrada en Home)

## 🧪 Testing

### Estrategia

- **Domain**: 100% cobertura (corazón del negocio)
- **Use Cases**: 80%+ cobertura (casos críticos)
- **Components**: 60%+ cobertura (componentes críticos)
- **Infrastructure**: 70%+ cobertura (mappers, repositorio)

### Prioridades

**ALTA**:

- Tests de dominio (factory, validaciones)
- Tests de casos de uso críticos
- Tests de componentes críticos (formulario, lista)

**MEDIA**:

- Tests de repositorio
- Tests de mappers
- Tests de hooks personalizados

## ⚡ Optimizaciones

- ✅ **Cache en Redux**: Evita llamadas innecesarias
- ✅ **Memoización**: Componentes pesados optimizados
- ✅ **Optimistic Updates**: DELETE con feedback inmediato
- ✅ **Validación Client-side**: Feedback antes de enviar
- ✅ **Formato de Números**: Formato legible (1,000.00)

## 📝 Principios de Desarrollo

### TypeScript

- **Sin `any`**: Tipado explícito en todo el código
- **Strict Mode**: TypeScript en modo estricto

### Código Limpio

- Separación de responsabilidades clara
- Reutilización de componentes
- Manejo de errores robusto
- Comentarios JSDoc en funciones críticas

### Arquitectura

- Domain puro (sin dependencias externas)
- Use cases orquestando correctamente
- Infrastructure implementando interfaces
- Presentation usando hooks y componentes

## 📚 Documentación Adicional

- `API_DOCUMENTATION.md` - Documentación completa de la API backend
- `IMPLEMENTATION_PLAN.md` - Plan técnico detallado de implementación

## 🎯 Criterios de Éxito

1. ✅ **Cobertura Completa**: Todos los endpoints de la API funcionando
2. ✅ **Arquitectura Limpia**: Hexagonal/DDD bien aplicado
3. ✅ **Código de Calidad**: TypeScript estricto, tests, código limpio
4. ✅ **UX Pulida**: Formularios, errores, loading states
5. ✅ **Pragmatismo**: Sin sobre-ingeniería, pero demostrando seniority

## 📄 Licencia

Proyecto privado - Prueba técnica

---

**Última actualización**: 2024-01-15
