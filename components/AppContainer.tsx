import { signal } from "@preact/signals-react";
import React, { Suspense, useEffect, useState } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import TodosApp from "./Todos/TodosApp";

const themes = ["Light", "Moon", "Green", "Wood"] as const;

type ThemesType = (typeof themes)[number];

const AppContainer = () => {
  const [storedTheme, setTheme] = useState<ThemesType | null>(null);
  const headerName = signal("Todos");

  useEffect(() => {
    //@ts-ignore
    let theme: ThemesType = localStorage.getItem("theme") ?? "Light";
    //@ts-ignore
    setTheme(theme);
  }, []);

  useEffect(() => {
    let theme = localStorage.getItem("theme") ?? "Light";
    localStorage.setItem("theme", storedTheme ?? theme);
    document.documentElement.setAttribute("theme", storedTheme ?? theme);
  }, [storedTheme]);

  const switchTheme = (e: any) => setTheme(e.target.innerText ?? "Light");
  return (
    <>
      <Navbar className="brand">
        <Navbar.Brand className="header d-flex">
          <div>{headerName.value}</div>
        </Navbar.Brand>
        <NavDropdown
          title={`${storedTheme} 🖌`}
          id="themes"
          className="d-flex justify-content-end"
        >
          {themes.map((theme) => (
            <NavDropdown.Item
              key={theme}
              onClick={switchTheme}
              active={theme == storedTheme}
            >
              {theme}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Navbar>
      <TodosApp />
    </>
  );
};

export default AppContainer;
