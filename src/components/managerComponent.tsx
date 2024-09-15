import { Button, Stack, Typography } from "@mui/material";
import RecyclerComponent from "./recyclerComponent";
import React from "react";

type Recycler = {
  id: number;
};

const ManagerComponent: React.FC = () => {
  const [recyclerList, setRecyclerList] = React.useState<Recycler[]>([]);

  function handleAddRecycler(): void {
    setRecyclerList((prevRecyclers) => [
      ...prevRecyclers,
      {
        id:
          prevRecyclers.length > 0
            ? Math.max(...prevRecyclers.map((recycler) => recycler.id)) + 1
            : 1,
      },
    ]);
  }

  return (
    <>
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
        {recyclerList.map((recycler) => (
          <RecyclerComponent key={recycler.id} {...recycler} />
        ))}
      </Stack>
    </>
  );
};

export default ManagerComponent;
