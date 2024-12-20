
import { List, Datagrid, TextField, BooleanField, DateField, Filter, TextInput, FilterProps } from "react-admin";

const UserFilter = (props:FilterProps) => (
    <Filter {...props}>
      <TextInput label="Buscar por Nombre de Usuario" source="Username" alwaysOn />
      <TextInput label="Buscar por Email" source="Attributes[0].Value" />
    </Filter>
  );

export default function UserList(){

  return (
  /* Lista de usuarios */
  /* Esta lista muestra los datos de cada usuario */
  /* Se utiliza Datagrid para organizar y mostrar los datos */
  /* Se utilizan TextField para mostrar los atributos del usuario */

    <List filter={UserFilter}>
    <Datagrid>
      {/* ID del usuario */}
      <TextField source="id" label="ID" />

      {/* Accediendo a los atributos del usuario */}
      <TextField source="email" label="Email" />
      <BooleanField source="enabled" label="Habilitado" />
      <TextField source="status" label="Estado del Usuario" />

      {/* Fechas de creación y modificación del usuario */}
      <DateField source="userCreate" label="Fecha de Creación" showTime />
      <DateField source="userModify" label="Última Modificación" showTime />
    </Datagrid>
  </List>
)
}

        