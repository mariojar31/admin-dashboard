import { CreateParams, DataProvider, DeleteParams, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetOneParams, UpdateParams } from 'react-admin';

// Definimos el dataProvider con los tipos correspondientes
const dataProvider: DataProvider = {
  // Implementación de getList
  getList: async (resource: string, params: GetListParams): Promise<GetListResult<any>> => {
    // Desestructuramos y aseguramos valores por defecto si no existen
    const { filter = {}, sort = { field: 'id', order: 'ASC' }, pagination = { page: 1, perPage: 10 } } = params;

    if (resource === 'users') {
      const url = 'https://4dyaouxw4o532ovbuc4ru6ywxu0lhmts.lambda-url.us-east-1.on.aws/';

      try {
        // Construir parámetros de búsqueda desde los filtros
        const filterParams = new URLSearchParams();
        if (filter.Username) {
          filterParams.set('username', filter.Username);
        }
        if (filter['Attributes[0].Value']) {
          filterParams.set('email', filter['Attributes[0].Value']);
        }

        // Agregar los parámetros de paginación
        filterParams.set('_start', ((pagination.page - 1) * pagination.perPage).toString());
        filterParams.set('_end', (pagination.page * pagination.perPage).toString());

        // Agregar los parámetros de orden
        filterParams.set('_sort', sort.field);
        filterParams.set('_order', sort.order);

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

        // Construye y devuelve el resultado en el formato esperado
        return {
          data: json.users.map((user: any) => ({
            id: user.Username,
            email: user.Attributes.email,
            status: user.UserStatus,
            enabled: user.Enabled,
            emailstatus: user.email_verified,
            userCreate: user.UserCreateDate,
            userModify: user.UserLastModifiedDate,
          })),
          total: json.users.length,
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

  // Implementación de getOne
  getOne: (resource: string, params: GetOneParams): Promise<any> => {
    return Promise.resolve({ data: {} });
  },

  // Implementación de getMany
  getMany: (resource: string, params: GetManyParams): Promise<any> => {
    return Promise.resolve({ data: [] });
  },

  // Implementación de getManyReference
  getManyReference: (resource: string, params: GetManyReferenceParams): Promise<any> => {
    return Promise.resolve({ data: [] });
  },

  // Implementación de create
  create: (resource: string, params: CreateParams): Promise<any> => {
    return Promise.resolve({ data: params.data });
  },

  // Implementación de update
  update: (resource: string, params: UpdateParams): Promise<any> => {
    return Promise.resolve({ data: params.data });
  },

  // Implementación de updateMany
  updateMany: (resource: string, params: any): Promise<any> => {
    return Promise.resolve({ data: [] });
  },

  // Implementación de delete
  delete: (resource: string, params: DeleteParams): Promise<any> => {
    return Promise.resolve({ data: {} });
  },

  // Implementación de deleteMany
  deleteMany: (resource: string, params: any): Promise<any> => {
    return Promise.resolve({ data: [] });
  },
};

export { dataProvider };
