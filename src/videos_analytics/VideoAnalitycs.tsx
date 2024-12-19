
import { BooleanField, Button, Datagrid, DateField, List, TextField, useRecordContext } from "react-admin";
import { useNavigate } from "react-router-dom";

export default function video_analytics(){

  const ViewUsersButton: React.FC = () => {
    const record = useRecordContext(); // Obtiene el registro actual
    const navigate = useNavigate(); // Navegación programática

    if (!record) return null; // Si no hay un registro, no renderiza el botón
        const handleClick = () => {
          // Navega a la lista de usuarios filtrada por el ID del video
          navigate(`/users?filter={"videoId":"${record.id}"}`);
        };
    
        return <Button label="Ver Usuarios" onClick={handleClick} />;
      };
    return (
        <List>
          <Datagrid>
            {/* ID del video */}
            <TextField source="id" label="ID del Video" />
    
            {/* Título y descripción del video */}
            <TextField source="title" label="Título" />
            <TextField source="description" label="Descripción" />
    
            {/* Publicación y estado del video */}
            <BooleanField source="published" label="Publicado" />
            <TextField source="status" label="Estado del Video" />
    
            {/* Fechas relacionadas con el video */}
            <DateField source="createdAt" label="Fecha de Creación" showTime />
            <DateField source="updatedAt" label="Última Modificación" showTime />
    
            {/* Organización a la que pertenece */}
            <TextField source="organization.name" label="Organización" />
    
            {/* Botón para "Ver Usuarios" */}
            <ViewUsersButton />
          </Datagrid>
        </List>
      )

}
