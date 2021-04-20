import "./NavigationItems.scss";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className="NavigationItems">
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    <NavigationItem link="/teams/:teamName/matches/:year" exact>
      Match
    </NavigationItem>
    <NavigationItem link="/teams/:teamName" exact>
      Team
    </NavigationItem>
  </ul>
);

export default navigationItems;
