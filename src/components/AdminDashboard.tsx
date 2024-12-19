import React from "react";
import {
  Admin,
  BooleanField,
  Datagrid,
  DateField,
  List,
  Resource,
  TextField
} from "react-admin";
import { Layout } from "../Layout"; // Desde `src/components` hacia `src/Layout`
import { authProvider } from "../authProvider"; // Desde `src/components` hacia `src/authProvider`
import { dataProvider } from "../dataProvider"; // Desde `src/components` hacia `src/dataProvider`
import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Verde primario
    },
    secondary: {
      main: "#ff9800", // Naranja secundario
    },
    background: {
      default: "#f4f4f4", // Fondo gris claro
    },
    text: {
      primary: "#333333", // Texto primario
      secondary: "#757575", // Texto secundario
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
  },
});

// Componente del panel de administración
const AdminDashboard: React.FC = () => (
  <Admin
    theme={customTheme}
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="users"
      list={() => (
        <List>
          <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="email" label="Email" />
            <BooleanField source="enabled" label="Habilitado" />
            <TextField source="status" label="Estado del Usuario" />
            <DateField source="userCreate" label="Fecha de Creación" showTime />
            <DateField source="userModify" label="Última Modificación" showTime />
          </Datagrid>
        </List>
      )}
    />

    <Resource
      name="video_analytics"
      list={() => (
        <List>
          <Datagrid>
            <TextField source="id" label="ID del Video" />
            <TextField source="title" label="Título" />
            <TextField source="description" label="Descripción" />
            <BooleanField source="published" label="Publicado" />
            <TextField source="status" label="Estado del Video" />
            <DateField source="createdAt" label="Fecha de Creación" showTime />
            <DateField source="updatedAt" label="Última Modificación" showTime />
            <TextField source="organization.name" label="Organización" />
          </Datagrid>
        </List>
      )}
    />
  </Admin>
);

export default AdminDashboard;
