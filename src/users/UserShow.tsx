
import { List, Datagrid, TextField, BooleanField, DateField } from "react-admin";

export default function UserShow(){

  return (
  /* Lista de usuarios */
  /* Esta lista muestra los datos de cada usuario */
  /* Se utiliza Datagrid para organizar y mostrar los datos */
  /* Se utilizan TextField para mostrar los atributos del usuario */
    <List>
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

        