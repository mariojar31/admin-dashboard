import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  DateField
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
// import UserList from "./users/UserList";
// import UserShow from "./users/UserShow";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="users"
      list={()=>(
        <List>
          <Datagrid>
            {/* ID del usuario */}
            <TextField source="Username" label="ID" />
            
            {/* Accediendo a los atributos del usuario */}
            <TextField
              source="Attributes[0].Value" // Este es el 'email'
              label="Email"
            />
            <BooleanField
              source="Enabled"
              label="Habilitado"
            />
            <TextField
              source="UserStatus"
              label="Estado del Usuario"
            />

            {/* Fechas de creación y modificación del usuario */}
            <DateField
              source="UserCreateDate"
              label="Fecha de Creación"
              showTime // Muestra la hora también
            />
            <DateField
              source="UserLastModifiedDate"
              label="Última Modificación"
              showTime
            />
          </Datagrid>
        </List>
      )}
    />
  </Admin>
);
