import "./App.css";
import { Container, Typography } from "@mui/material";
import Manager from "./components/managerComponent";
import { useEffect } from "react";

function App() {
  // Main loop called every second
  useEffect(() => {
    const updateCounter = () => {};
    const intervalId = setInterval(updateCounter, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h3">Bottle Recycler</Typography>
        <Manager initialMoney={1000}></Manager>
      </Container>
    </>
  );
}

export default App;
