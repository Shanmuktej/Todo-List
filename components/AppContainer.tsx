import { signal } from "@preact/signals-react";
import React, { Suspense, useEffect, useState } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import TodosApp from "./Todos/TodosApp";
import Portfolio from "./Porfolio/Portfolio";

const themes = ["Light", "Dark", "Light Green", "Light Wood"] as const;
const apps = ["Portfolio", "Todos"] as const;

type ThemesType = typeof themes[number];
export type AppsType = typeof apps[number];

const AppContainer = () => {
  const [storedTheme, setTheme] = useState<ThemesType | null>(null)
  const [storedApp, setApp] = useState<AppsType | null>(null)
  const headerName = signal("Anem's")

  useEffect(() => {
    //@ts-ignore
    let theme: ThemesType = localStorage.getItem("theme") ?? "Light";
    //@ts-ignore
    let currentApp: AppsType = localStorage.getItem("currentApp") ?? 'Portfolio';
    setTheme(theme)
    setApp(currentApp)
  }, [])

  useEffect(() => {
    let currentApp = localStorage.getItem("currentApp") ?? "Portfolio";
    localStorage.setItem("currentApp", storedApp ?? currentApp);
  }, [storedApp])

  useEffect(() => {
    let theme = localStorage.getItem("theme") ?? "Light";
    localStorage.setItem("theme", storedTheme ?? theme);
    document.documentElement.setAttribute("theme", storedTheme ?? theme);
  }, [storedTheme])

  const switchTheme = (e: any) => setTheme(e.target.innerText ?? "Light")
  const switchApp = (e: any) => setApp(e.target.innerText)
  return (
    <>
      <Navbar className="brand">
        <Navbar.Brand className="header d-flex">
          <div>{headerName.value}</div>
          <NavDropdown title={storedApp} id="apps" style={{ marginLeft: '15px' }}>
            {apps.map((app) => (
              <NavDropdown.Item key={app} onClick={switchApp} active={app == storedApp}>
                {app}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Navbar.Brand>
        <NavDropdown title={`${storedTheme} 🖌`} id="themes" className="d-flex justify-content-end">
          {themes.map((theme) => (
            <NavDropdown.Item key={theme} onClick={switchTheme} active={theme == storedTheme}>
              {theme}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Navbar>
      {storedApp === "Todos" ?
        <TodosApp />
        : <Portfolio />}
    </>
  );
};

export default AppContainer;