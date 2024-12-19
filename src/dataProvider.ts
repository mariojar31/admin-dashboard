import { CreateParams, DataProvider, DeleteParams, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetOneParams, UpdateParams } from 'react-admin';

// Definimos el dataProvider con los tipos correspondientes
const dataProvider: DataProvider = {
  // Implementación de getList
  getList: async (resource: string, params: GetListParams): Promise<GetListResult<any>> => {
    const url = 'https://s2ejysktvq2du4jht6tuabdrim0kcgpe.lambda-url.us-east-1.on.aws/';

    try {
        const response = await fetch(url, {
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
                userModify: user.UserLastModifiedDate
            })),
            total: json.users.length,
        };
    } catch (error) {
        console.error('Error en fetch directo:', error);

        // Devuelve un resultado vacío o lanza un error para que `react-admin` lo maneje
        return {
            data: [],
            total: 0,
        };
    }
},
  
   


  // Implementación de getOne
  getOne: (resource: string, params: GetOneParams): Promise<any> => {
    // Aquí puedes realizar la lógica para obtener un solo recurso, basado en el ID
    return Promise.resolve({ data: {} });  // Devuelve un objeto vacío por ahora
  },

  // Implementación de getMany
  getMany: (resource: string, params: GetManyParams): Promise<any> => {
    // Aquí puedes obtener múltiples elementos basados en los parámetros dados
    return Promise.resolve({ data: [] });  // Devuelve un arreglo vacío por ahora
  },

  // Implementación de getManyReference
  getManyReference: (resource: string, params: GetManyReferenceParams): Promise<any> => {
    // Aquí puedes manejar la paginación o relación entre recursos
    return Promise.resolve({ data: [] });  // Devuelve un arreglo vacío por ahora
  },

  // Implementación de create
  create: (resource: string, params: CreateParams): Promise<any> => {
    // Lógica de creación del recurso
    return Promise.resolve({ data: params.data });
  },

  // Implementación de update
  update: (resource: string, params: UpdateParams): Promise<any> => {
    // Lógica de actualización del recurso
    return Promise.resolve({ data: params.data });
  },

  // Implementación de updateMany
  updateMany: (resource: string, params: any): Promise<any> => {
    // Lógica de actualización de múltiples recursos
    return Promise.resolve({ data: [] });
  },

  // Implementación de delete
  delete: (resource: string, params: DeleteParams): Promise<any> => {
    // Lógica de eliminación del recurso
    return Promise.resolve({ data: {} });
  },

  // Implementación de deleteMany
  deleteMany: (resource: string, params: any): Promise<any> => {
    // Lógica de eliminación de múltiples recursos
    return Promise.resolve({ data: [] });
  },
};

export { dataProvider };

