"use client";
import { ReactNode } from "react";
import TOC from "./toc";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Provider } from "react-redux";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    // <Provider store={store}>
      <table>
      <tbody>
        <tr>
          <td valign="top" width="100px">
            <TOC />
          </td>
          <td valign="top">{children}</td>
        </tr>
      </tbody>
    </table>


    // </Provider>
    
  );
}
