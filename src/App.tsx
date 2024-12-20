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
import Videos from "./videos/Videos";
import {VideoFileRounded, People} from '@mui/icons-material';



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
        icon={People}
        
      />

      {/* Recurso de Videos */}
      <Resource
        name="videos"
        list={ Videos }
        icon={VideoFileRounded}
      />

      {/* Recurso de Videos */}
      {/* <Resource
        name="organizations"
        list={ VideoAnalytics }
        icon={VideoFileRounded}
      /> */}
    </Admin>

    
  );


};

