import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/globals";

export function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Dashboard />

    </>
  );
}

export default App;
