import { Home } from "../../Components/Home/Home";
import { Menu } from "../../Components/Menu/Menu";
import "./Init.css";

export function Init() {
  return (
    <header className="container-header">
      <Menu />
      <Home />
    </header>
  );
}
