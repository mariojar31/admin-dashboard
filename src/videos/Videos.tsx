
import { BooleanField, Button, Datagrid, DateField, List, TextField, useRecordContext } from "react-admin";
import { useNavigate } from "react-router-dom";

export default function Videos(){

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
    
            {/* Título y descripción del video */}
            <TextField source="title" label="Título" />
            <TextField source="description" label="Descripción" />

            <TextField source="visible" label="Estado del Video" />
    
            {/* Fechas relacionadas con el video */}
            <DateField source="createdAt" label="Fecha de Creación" showTime />
    
            {/* Organización a la que pertenece */}
            <TextField source="organization.name" label="Organización" />
    
            {/* Botón para "Ver Usuarios" */}
            <ViewUsersButton />
          </Datagrid>
        </List>
      )

}
