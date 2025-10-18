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

export interface StudentGroup {
  id: string;
  name: string;
  students: StudentApiConfig[];
}

/**
 * Endpoints esperados para cada API segun el contexto de WatchLog.
 * Ajusta cualquiera si un alumno expone rutas diferentes.
 */
export const defaultEndpoints: EndpointConfig[] = [
  { label: 'Healthcheck', method: 'GET', path: '/health/' },
  { label: 'Listar peliculas', method: 'GET', path: '/movies/' },
  { label: 'Crear pelicula', method: 'POST', path: '/movies/' },
  { label: 'Detalle pelicula', method: 'GET', path: '/movies/:id' },
  { label: 'Actualizar pelicula', method: 'PUT', path: '/movies/:id' },
  { label: 'Eliminar pelicula', method: 'DELETE', path: '/movies/:id' },
  { label: 'Listar series', method: 'GET', path: '/series/' },
  { label: 'Crear serie', method: 'POST', path: '/series/' },
  { label: 'Detalle serie', method: 'GET', path: '/series/:id' },
  { label: 'Actualizar serie', method: 'PUT', path: '/series/:id' },
  { label: 'Eliminar serie', method: 'DELETE', path: '/series/:id' },
  { label: 'Crear temporada', method: 'POST', path: '/series/:id/seasons' },
  {
    label: 'Agregar pelicula a watchlist',
    method: 'POST',
    path: '/watchlist/movies/:movie_id',
  },
  {
    label: 'Agregar serie a watchlist',
    method: 'POST',
    path: '/watchlist/series/:series_id',
  },
  { label: 'Actualizar progreso serie', method: 'PATCH', path: '/progress/series/:series_id' },
  { label: 'Mi watchlist', method: 'GET', path: '/me/watchlist' },
];

/**
 * Define los grupos y alumnos disponibles en el dashboard.
 * Ajusta la estructura segun tus cohortes y despliegues reales.
 */
export const studentGroups: StudentGroup[] = [
  {
    id: '07IDESMA',
    name: '07IDESMA',
    students: [
      {
        id: 'victor-perez',
        name: 'Victor Perez',
        baseUrl: 'https://watchlog-api.onrender.com',
        healthPath: '/health/',
        endpoints: defaultEndpoints,
      },
      {
        id: 'luis-daniel',
        name: 'Luis Daniel Bobadilla Contreras',
        baseUrl: 'https://watchlog-ldbc.onrender.com',
        healthPath: '/health/',
        endpoints: defaultEndpoints,
      },
      {
        id: 'blad-mejia',
        name: 'Bladimir Mejia Hernandez',
        baseUrl: 'https://watchlog-bmh.onrender.com',
        healthPath: '/health/',
        endpoints: defaultEndpoints,
      },
      {
        id: 'mario-qui',
        name: 'Mario Quiñones Castro',
        baseUrl: 'https://watchlog-mqc.onrender.com',
        healthPath: '/health/',
        endpoints: defaultEndpoints,
      },
      {
        id: 'rafa-pena',
        name: 'Rafael Ramirez Peña',
        baseUrl: 'https://watchlog-api-rafaelramirez.onrender.com',
        healthPath: '/health/',
        endpoints: defaultEndpoints,
      },
      {
        id: 'aaron-tellez',
        name: 'Aaron Esteban Tellez Zamudio',
        baseUrl: 'https://watchlog-az.onrender.com',
        healthPath: '/health/',
        endpoints: defaultEndpoints,
      },
    ],
  },
  {
    id: '07IDESVA',
    name: '07IDESVA',
    students: [
      {
        id: 'maria-garcia',
        name: 'Maria Garcia',
        baseUrl: 'https://watchlog-mg.onrender.com',
        healthPath: '/health/',
        endpoints: defaultEndpoints,
      },
    ],
  },
];

export const students: StudentApiConfig[] = studentGroups.flatMap((group) => group.students);
