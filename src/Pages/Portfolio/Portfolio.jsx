import { Footer } from "../../Components/Footer/Footer";
import { Menu } from "../../Components/Menu/Menu";
import { Work } from "../../Components/Work-section/Work";
import Accessibility from "../../Components/Accessibility/Accessibility";
import "./Portfolio.css";

export function Portfolio() {
  return (
    <section>
      <Menu />
      <Work />
      <Footer />
      <Accessibility />
    </section>
  );
}
