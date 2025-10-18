export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface EndpointConfig {
  label: string;
  method: HttpMethod;
  path: string;
}

export interface StudentApiConfig {
  id: string;
  name: string;
  baseUrl: string;
  healthPath?: string;
  endpoints: EndpointConfig[];
}

/**
 * Endpoints esperados para cada API según el contexto de WatchLog.
 * Ajusta cualquiera si un alumno expone rutas diferentes.
 */
export const defaultEndpoints: EndpointConfig[] = [
  { label: 'Healthcheck', method: 'GET', path: '/health/' },
  { label: 'Listar películas', method: 'GET', path: '/movies/' },
  { label: 'Crear película', method: 'POST', path: '/movies/' },
  { label: 'Detalle película', method: 'GET', path: '/movies/:id' },
  { label: 'Actualizar película', method: 'PUT', path: '/movies/:id' },
  { label: 'Eliminar película', method: 'DELETE', path: '/movies/:id' },
  { label: 'Listar series', method: 'GET', path: '/series/' },
  { label: 'Crear serie', method: 'POST', path: '/series/' },
  { label: 'Detalle serie', method: 'GET', path: '/series/:id' },
  { label: 'Actualizar serie', method: 'PUT', path: '/series/:id' },
  { label: 'Eliminar serie', method: 'DELETE', path: '/series/:id' },
  { label: 'Crear temporada', method: 'POST', path: '/series/:id/seasons' },
  { label: 'Agregar película a watchlist', method: 'POST', path: '/watchlist/movies/:movie_id' },
  { label: 'Agregar serie a watchlist', method: 'POST', path: '/watchlist/series/:series_id' },
  { label: 'Actualizar progreso serie', method: 'PATCH', path: '/progress/series/:series_id' },
  { label: 'Mi watchlist', method: 'GET', path: '/me/watchlist' },
];

/**
 * Completa esta lista con todos los alumnos.
 * Usa un id legible (kebab-case) y la URL exacta de su deploy.
 */
export const students: StudentApiConfig[] = [
  {
    id: 'victor-perez',
    name: 'Victoe Pérez',
    baseUrl: 'https://watchlog-api.onrender.com',
    healthPath: '/health/',
    endpoints: defaultEndpoints,
  },
  {
    id: 'maria-garcia',
    name: 'María García',
    baseUrl: 'https://watchlog-mg.onrender.com',
    healthPath: '/health/',
    endpoints: defaultEndpoints,
  },
  // Agrega más alumnos aquí...
];
