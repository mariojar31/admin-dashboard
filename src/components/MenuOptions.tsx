import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';

export const MenuOptions = () => (
    <Menu>
 
        <Menu.ResourceItem name='users'/>
        <Menu.ResourceItem name='videos' />
        <Menu.ResourceItem name='organizations' />

    </Menu>
);