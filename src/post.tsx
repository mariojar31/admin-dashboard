import React from 'react';
import { Datagrid, List, ReferenceField, TextField } from 'react-admin';

export const PostList: React.FC = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);
