import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { MenuOptions } from "./components/MenuOptions";
import { MyAppBar } from "./components/AppBar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={MenuOptions} appBar={MyAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
