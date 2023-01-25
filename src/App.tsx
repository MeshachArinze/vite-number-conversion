import Registration from "./components/Registration";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Registration />
      </ErrorBoundary>
    </div>
  );
}

export default App;
