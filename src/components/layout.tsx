import React, { ReactNode } from "react";
import { Header, Notification } from "@components";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Notification />
      <Header />
      {children}
    </>
  );
};
