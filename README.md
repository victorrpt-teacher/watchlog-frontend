# WatchLog Frontend Dashboard

Dashboard en React + TypeScript para monitorear las APIs de los alumnos del curso WatchLog.
Permite listar cada despliegue, revisar su salud y ejecutar manualmente los endpoints CRUD
definidos en la API.

## Caracteristicas principales

- **Listado de alumnos**: visualiza todas las APIs registradas y su estado de `/health/`.
- **Dashboard individual**: para cada alumno muestra los endpoints configurados y un
  modulo interactivo para invocar cada ruta con diferentes metodos y payloads.
- **Indicadores en vivo**: integracion con `@tanstack/react-query` para refrescar el
  healthcheck periodicamente y mostrar badges verde/rojo segun la respuesta.
- **UI moderna**: maquetado con Mantine UI y soporte para dark mode.
- **Configuracion declarativa**: las URLs y endpoints estan centralizados en
  `src/config/students.ts`, lo que permite versionar los cambios en lugar de modificarlos
  desde el navegador.

## Stack tecnico

- React 19 + TypeScript
- Vite 7 como bundler
- Mantine UI para componentes
- @tanstack/react-query para gestion de datos remotos
- Axios para requests HTTP
- React Router 7 para el enrutado

## Configuracion inicial

1. **Instalar dependencias**
   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   pnpm install
   ```
2. **Ejecutar en local**
   ```bash
   pnpm dev
   ```
3. **Configurar alumnos**
   Edita `src/config/students.ts` y agrega una entrada por alumno con:
   - `id`: identificador unico (kebab-case recomendado)
   - `name`: nombre a mostrar
   - `baseUrl`: URL publica de la API del alumno
   - `healthPath`: ruta del healthcheck (por defecto `/health/`)
   - `endpoints`: lista de endpoints que expondra el dashboard

## Scripts disponibles

| Comando        | Descripcion                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Servidor de desarrollo (Vite)     |
| `pnpm build`   | Compilacion de produccion         |
| `pnpm preview` | Previsualizacion del build        |
| `pnpm lint`    | Ejecuta ESLint sobre el codigo    |

## Deploy en Render (Static Site)

- **Build Command**: `corepack enable pnpm && pnpm install && pnpm build`
- **Publish Directory**: `dist`
- **Node**: se recomienda usar Node 20

Opcionalmente puedes versionar un `render.yaml` como el siguiente:

```yaml
services:
  - type: static
    name: watchlog-fe
    buildCommand: corepack enable pnpm && pnpm install && pnpm build
    staticPublishPath: dist
    env:
      - key: NODE_VERSION
        value: 20
```

Cada vez que actualices `students.ts` y hagas deploy, el dashboard reflejara la nueva
lista de APIs disponibles.
