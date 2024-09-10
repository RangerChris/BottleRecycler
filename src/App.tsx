import "./App.css";
import { Button, Container, Stack, Typography } from "@mui/material";
import Recycler from "./components/recycler";
import React from "react";

function App() {
  const [recyclers, setRecyclers] = React.useState([{ id: 1 }]);

  function handleAddRecycler(): void {
    setRecyclers((prevRecyclers) => [
      ...prevRecyclers,
      { id: Math.max(...prevRecyclers.map((recycler) => recycler.id)) + 1 },
    ]);
  }

  return (
    <>
      <Container>
        <Typography variant="h3">Bottle Recycler</Typography>
        <Button variant="contained" onClick={handleAddRecycler}>
          Add recycler
        </Button>
        <p></p>

        <Stack
          justifyContent="space-evenly"
          direction={"row"}
          spacing={2}
          sx={{ flexWrap: "wrap" }}
        >
          {recyclers.map((recycler) => (
            <Recycler key={recycler.id} {...recycler} />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default App;
