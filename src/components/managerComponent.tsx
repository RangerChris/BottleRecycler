import { Button, Stack, Typography } from "@mui/material";
import RecyclerComponent from "./recyclerComponent";
import React, { useState } from "react";

type Recycler = {
  id: number;
};

interface props {
  initialMoney: number;
}

const recyclerPrice = 600;

const ManagerComponent = ({ initialMoney }: props) => {
  const [recyclerList, setRecyclerList] = React.useState<Recycler[]>([]);
  const [money, setMoney] = useState(initialMoney);

  function handleBuyRecycler(): void {

    if (money < recyclerPrice) {
      return;
    }

    setMoney(money-recyclerPrice);
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
      Money: {money}
      <br />
      <Button variant="contained" onClick={handleBuyRecycler}>
        Buy recycler
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
