import { CreateParams, DataProvider, DeleteParams, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetOneParams, UpdateParams } from 'react-admin';


interface User {
  Username: string;
  Attributes: {
    email?: string;
    [key: string]: string | undefined;
  };
  Enabled: boolean;
  UserStatus: string;
  UserCreateDate: string;
  UserLastModifiedDate: string;
  email_verified: boolean;
}

interface Mp4Source {
  bucket: string;
  key: string;
}

interface VideoMetadata {
  duration_ms: string; // En milisegundos como string
  mp4_source_subtitled: Mp4Source;
  thumbnail: string; // URL del thumbnail
  transcriptedText: string; // Texto transcrito
  keywords: string[]; // Lista de palabras clave
  subtitled: boolean; // Indica si está subtitulado
  mp4_source: Mp4Source; // Información sobre el MP4 fuente
  summarize: string; // Resumen del video
  normalized_title: string; // Título normalizado (para búsqueda)
  title: string; // Título del video
  url: string; // URL del video (por ejemplo, archivo m3u8)
}

interface Video {
  metadata: VideoMetadata; // Metadatos del video
  filename: string; // Nombre del archivo
  visible: boolean; // Si es visible
  flag: string; // Flag asociado (ej., "clipped")
  category_id: string; // ID de la categoría
  org: string; // Organización asociada
  created_at: string; // Fecha y hora de creación en formato string
}

const dataProvider: DataProvider = {
  // Implementación de getList
  getList: async (resource: string, params: GetListParams): Promise<GetListResult<any>> => {
    const { filter = {}, sort = { field: 'id', order: 'ASC' }, pagination = { page: 1, perPage: 10 } } = params;

    if (resource === 'users') {
      const url = 'https://7od2hicvo46zsegg4vcd2lb4ga0tgyov.lambda-url.us-east-1.on.aws/';

      try {
        // Construir parámetros de búsqueda desde los filtros
        const filterParams = new URLSearchParams();
        
        // Filtro por Username (si se pasa)
        if (filter['Username']) {
          filterParams.set('username', filter['Username']);
        }

        // Filtro por email (Attributes[0].Value)
        if (filter['Attributes[0].Value']) {
          filterParams.set('email', filter['Attributes[0].Value']);
        }

        // Agregar los parámetros de paginación
        filterParams.set('_start', ((pagination.page - 1) * pagination.perPage).toString());
        filterParams.set('_end', (pagination.page * pagination.perPage).toString());

        // Agregar los parámetros de orden
        filterParams.set('_sort', sort.field);
        filterParams.set('_order', sort.order);

        // Solicitar los datos de la API
        const response = await fetch(`${url}?${filterParams.toString()}`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log('Datos recibidos:', json);

        // Asegúrate de que la API devuelva el total de registros
        const total = json.total || json.users.length;  // Asegúrate de que tu API devuelva "total" o usa la longitud de usuarios

        // Devuelve los datos y el total esperado por React Admin
        return {
          data: json.users.map((user: User) => ({
            id: user.Username,
            email: user.Attributes.email,
            status: user.UserStatus,
            enabled: user.Enabled,
            emailstatus: user.email_verified,
            userCreate: user.UserCreateDate,
            userModify: user.UserLastModifiedDate,
          })),
          total: total,  // Asegúrate de pasar el total correcto
        };
      } catch (error) {
        console.error('Error en fetch directo:', error);

        // Devuelve un resultado vacío si ocurre un error
        return {
          data: [],
          total: 0,
        };
      }
    }else if (resource === 'videos') {
      const urlVideos = 'https://2gp7ppvfbtukvnrjkwga3gbkt40qkkyw.lambda-url.us-east-1.on.aws/';
    
      try {
        // Construir parámetros de búsqueda desde los filtros
        const filterParams = new URLSearchParams();
    
        // Agregar los parámetros de paginación si están disponibles
        if (pagination) {
          filterParams.set('_start', ((pagination.page - 1) * pagination.perPage).toString());
          filterParams.set('_end', (pagination.page * pagination.perPage).toString());
        }
    
        // Agregar los parámetros de orden si están disponibles
        if (sort) {
          filterParams.set('_sort', sort.field);
          filterParams.set('_order', sort.order);
        }
    
        // Solicitar los datos de la API
        const response = await fetch(`${urlVideos}?${filterParams.toString()}`);
    
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
    
        const json = await response.json();
        console.log('Datos recibidos:', json);
    
        // Asegúrate de que la API devuelva el total de registros, o usa la longitud de los resultados
        const total = json.total || json.videos.length;  // Asegúrate de que tu API devuelva "total" o usa la longitud de los videos
    
        // Mapeo de los videos con validaciones para asegurarse de que todos los campos necesarios existen
        const data = json.videos.map((video: any) => {
          return {
            id: video.filename,  // Asignamos el 'filename' como id único
            title: video.metadata?.title || 'Título no disponible',  // Validamos que 'metadata' y 'title' existan
            description: video.metadata?.summarize || 'Descripción no disponible',  // Validamos que 'summarize' exista
            visible: video.visible,
            createdAt: video.created_at,
            organizationName: video.org,
          };
        });
    
        // Devuelve los datos y el total esperado por React Admin
        return {
          data,
          total,  // Total de elementos, necesario para la paginación
        };
      } catch (error) {
        console.error('Error en fetch directo:', error);
    
        // Devuelve un resultado vacío si ocurre un error
        return {
          data: [],
          total: 0,
        };
      }
    }
    
    

    // Si no es "users", podemos añadir otras condiciones o devolver datos vacíos
    return {
      data: [{ error: 'No valid source' }],
      total: 0,
    };
  },

  // Otros métodos como getOne, getMany, etc., se dejan vacíos si no se están usando por ahora
  getOne: async (resource: string, params: GetOneParams): Promise<any> => {
    if (resource === 'users') {
      const url = `https://276nn7c64bvya7q3l54kwfg6f40foftd.lambda-url.us-east-1.on.aws/${params.id}`;

      const response = await fetch(url);
      const json = await response.json();

      return {
        data: {
          id: json.Username,
          email: json.Attributes.email,
          status: json.UserStatus,
          enabled: json.Enabled,
          emailstatus: json.email_verified,
          userCreate: json.UserCreateDate,
          userModify: json.UserLastModifiedDate,
        },
      };
    }

    return { data: {} }; // Retorna datos vacíos si no es el recurso "users"
  },

  // Métodos no implementados, retornan datos vacíos
  getMany: (resource: string, params: GetManyParams): Promise<any> => {
    return Promise.resolve({ data: [] });
  },

  getManyReference: (resource: string, params: GetManyReferenceParams): Promise<any> => {
    return Promise.resolve({ data: [] });
  },

  create: (resource: string, params: CreateParams): Promise<any> => {
    return Promise.resolve({ data: params.data });
  },

  update: (resource: string, params: UpdateParams): Promise<any> => {
    return Promise.resolve({ data: params.data });
  },

  updateMany: (resource: string, params: any): Promise<any> => {
    return Promise.resolve({ data: [] });
  },

  delete: (resource: string, params: DeleteParams): Promise<any> => {
    return Promise.resolve({ data: {} });
  },

  deleteMany: (resource: string, params: any): Promise<any> => {
    return Promise.resolve({ data: [] });
  },
};

export { dataProvider };
