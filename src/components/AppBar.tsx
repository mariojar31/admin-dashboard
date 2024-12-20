import { AppBar, TitlePortal, RefreshIconButton, ImageField } from 'react-admin';

export const MyAppBar = () => (
    <AppBar sx={{backgroundColor: "#e8c228"}}>
        <img src='../favicon.png' alt='Icono de Xalstream' width={30} height={30} style={{marginRight:10}}/>
        <TitlePortal />
    </AppBar>
);