import { Home } from '../../Components/Home/Home';
import { Menu } from '../../Components/Menu/Menu';
import './Header.css';

export function Header() {
 
  return (
    <header className="container-header">
      <Menu />
      <Home />
    </header>
  );
}
