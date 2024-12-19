import React from "react";
import {
  Admin,
  BooleanField,
  Button,
  Datagrid,
  DateField,
  List,
  Resource,
  TextField,
  useRecordContext
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
// import AdminDashboard from "./components/AdminDashboard";
import { dataProvider } from "./dataProvider";
import UserShow from "./users/UserShow";
import VideoAnalytics from "./videos_analytics/VideoAnalitycs";

export const App = () => {
  // Botón personalizado para "Ver Usuarios"
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
    <Admin
      layout={Layout}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {/* Recurso de Usuarios */}
      <Resource
        name="users"
        list={ UserShow}
      />

      {/* Recurso de Videos */}
      <Resource
        name="video_analytics"
        list={ VideoAnalytics }
      />
    </Admin>
  );


};

