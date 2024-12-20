import { List, Datagrid, TextField, BooleanField, DateField, Filter, TextInput, Pagination, FilterProps, ListActions, SearchInput } from 'react-admin';

// Filtro para buscar por email
const userFilter = [
    <TextInput label="Email" source="email" alwaysOn/>

];

export default function UserList() {
  return (
    <List
      filters={userFilter} // Filtros
      pagination={<Pagination />} // Paginación
      perPage={10} // Establecemos el número de elementos por página
      actions={<ListActions hasCreate />}
    >
      <Datagrid>
        {/* ID del usuario */}
        <TextField source="id" label="ID" />

        {/* Email */}
        <TextField source="email" label="Email" />

        {/* Estado de habilitación */}
        <BooleanField source="enabled" label="Habilitado" />

        {/* Estado del usuario */}
        <TextField source="status" label="Estado del Usuario" />

        {/* Fechas de creación y modificación */}
        <DateField source="userCreate" label="Fecha de Creación" showTime />
        <DateField source="userModify" label="Última Modificación" showTime />
      </Datagrid>
    </List>
  );
}
