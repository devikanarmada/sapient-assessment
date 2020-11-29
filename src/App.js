import { Route, Redirect } from "react-router-dom";
import { HomeComponent } from "./components/home/home";
import { FilterComponent } from "./components/filter/filter";
import "./App.css";

function App() {
  return (
    <div>
      <Route exact path="/*">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={HomeComponent} />
      <Route path="/filter" component={FilterComponent} />
    </div>
  );
}

export default App;
