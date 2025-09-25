import "./App.css";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Manager from "./components/managerComponent";
import { useEffect } from "react";
import InstructionsComponent from "./components/instructionsComponent";

function App() {
  useEffect(() => {
    const updateCounter = () => { };
    const intervalId = setInterval(updateCounter, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "left", padding: 10 }} >
        <AppBar position="fixed" sx={{ zIndex: 1000 }}>
          <Toolbar sx={{ alignItems: 'center' }}>
            <Typography variant="h2" sx={{ mr: 4 }}>Bottle Recycler</Typography>
            <InstructionsComponent />
          </Toolbar>
        </AppBar>
        <Manager initialMoney={1000}></Manager>
      </Container>
    </>
  );
}

export default App;
