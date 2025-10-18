# WatchLog API · Contexto para el Frontend

Este documento resume el estado actual de la API de WatchLog para que el equipo frontend tenga claridad sobre qué endpoints existirán, cuáles son los modelos y qué partes aún están en desarrollo.

## Estado general
- Proyecto Flask estructurado bajo el patrón *application factory*.
- Endpoints, servicios y modelos creados como esqueletos con `TODO`; actualmente las rutas devuelven HTTP 501 (`Not Implemented`).
- Se espera que los alumnos completen la lógica de negocio antes de que la API sirva datos reales.

## Modelos previstos
| Modelo | Campos clave | Notas |
|--------|--------------|-------|
| `User` | `id`, `name`, `email`, `created_at` | Identificación simulada usando el header `X-User-Id`. |
| `Movie` | `id`, `title`, `genre`, `release_year`, `created_at` | Relación 1:N con `WatchEntry`. |
| `Series` | `id`, `title`, `total_seasons`, `created_at` | Relación 1:N con `Season` y `WatchEntry`. |
| `Season` | `id`, `series_id`, `number`, `episodes_count` | Asociada a `Series`. |
| `WatchEntry` | `id`, `user_id`, `content_type`, `content_id`, `status`, `current_season`, `current_episode`, `watched_episodes`, `total_episodes` | Calcula `percentage_watched`. |

El cálculo de avance sugerido es `watched_episodes / total_episodes * 100`, controlando divisiones por cero y límites.

## Endpoints planeados
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/health/` | Healthcheck básico. | Retorna `{"status": "ok"}` pero se espera ampliar. |
| GET/POST | `/movies/` | Listado y creación de películas. | 501 |
| GET/PUT/DELETE | `/movies/<id>` | Operaciones sobre película individual. | 501 |
| GET/POST | `/series/` | Listado y creación de series. | 501 |
| GET/PUT/DELETE | `/series/<id>` | Operaciones sobre serie individual. | 501 |
| POST | `/series/<id>/seasons` | Alta de temporadas. | 501 |
| POST | `/watchlist/movies/<movie_id>` | Agregar película a la watchlist. | 501 |
| POST | `/watchlist/series/<series_id>` | Agregar serie a la watchlist. | 501 |
| PATCH | `/progress/series/<series_id>` | Actualizar progreso de una serie. | 501 |
| GET | `/me/watchlist` | Listado de contenidos del usuario. | 501 |

> Nota: todas las rutas fuera de `/health/` están listas para cablearse pero requieren implementación en `src/api/*.py` y `src/models/*.py`.

## Requisitos para consumir la API (una vez implementada)
- **Autenticación**: header `X-User-Id` obligatorio para rutas de watchlist/progreso.
- **Formato JSON**: los endpoints aceptarán/retornarán JSON. Las estructuras exactas dependerán de las implementaciones finales de los servicios.
- **Códigos de estado**: se espera usar 200, 201, 204 para operaciones exitosas y 4xx/5xx para errores (a definir).

## Próximos pasos antes de integrar el frontend
1. Completar los modelos SQLAlchemy y ejecutar migraciones (`flask db upgrade` ya está automatizado en Render vía `postDeployCommand`).
2. Implementar la lógica en `MovieService`, `SeriesService` y `ProgressService`, conectándolos con los blueprints.
3. Definir contratos de respuesta estables (payloads, códigos HTTP) y documentarlos.
4. Una vez listos, compartir ejemplos de requests/responses para que el frontend pueda mockear datos mientras tanto.

## Recursos adicionales
- README del proyecto (`../README.md`) con guía completa para alumnos y estructura del repositorio.
- Configuración de despliegue en Render (`../render.yaml`) y entrada WSGI (`../wsgi.py`).
