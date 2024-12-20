import React from "react";
import {
  Admin,
  Resource,
} from "react-admin";

import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
// import AdminDashboard from "./components/AdminDashboard";
import { dataProvider } from "./dataProvider";
import UserList from "./users/UserList";
import VideoAnalytics from "./videos_analytics/VideoAnalitycs";

export const App = () => {


  return (
    <Admin
      layout={Layout}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {/* Recurso de Usuarios */}
      <Resource
        name="users"
        list={ UserList}
        
      />

      {/* Recurso de Videos */}
      <Resource
        name="video_analytics"
        list={ VideoAnalytics }
      />
    </Admin>
  );


};

