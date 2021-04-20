import "./Toolbar.scss";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => (
  <header className="Toolbar">
    <nav className="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
