import { CreateParams, DataProvider, DeleteParams, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetOneParams, UpdateParams } from 'react-admin';

// Definimos la estructura de un usuario para TypeScript
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

const dataProvider: DataProvider = {
  // Implementación de getList
  getList: async (resource: string, params: GetListParams): Promise<GetListResult<any>> => {
    const { filter = {}, sort = { field: 'id', order: 'ASC' }, pagination = { page: 1, perPage: 10 } } = params;

    if (resource === 'users') {
      const url = 'https://ckveuqgakprpw57axbcqbixz7m0zmxdj.lambda-url.us-east-1.on.aws/';

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
        const response = await fetch(`${url}?${filterParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

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
    }else if(resource=='video_analytics'){

      const urlVideos = 'https://4d4q5yca6qhm5zr4p7db55pvee0xbujg.lambda-url.us-east-1.on.aws/';

      try {
        // Construir parámetros de búsqueda desde los filtros
        const filterParams = new URLSearchParams();
        
  
        // Agregar los parámetros de paginación
        filterParams.set('_start', ((pagination.page - 1) * pagination.perPage).toString());
        filterParams.set('_end', (pagination.page * pagination.perPage).toString());

        // Agregar los parámetros de orden
        filterParams.set('_sort', sort.field);
        filterParams.set('_order', sort.order);

        // Solicitar los datos de la API
        const response = await fetch(`${urlVideos}?${filterParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        console.log("Response: ",response)
        const json = await response.json();
        console.log('Datos recibidos:', json);

        // Asegúrate de que la API devuelva el total de registros
        // const total = json.total || json.users.length;  // Asegúrate de que tu API devuelva "total" o usa la longitud de usuarios

        // Devuelve los datos y el total esperado por React Admin
        return {
          data: json 
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
      const url = `https://ckveuqgakprpw57axbcqbixz7m0zmxdj.lambda-url.us-east-1.on.aws/${params.id}`;

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
