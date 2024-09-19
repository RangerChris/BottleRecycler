import { Button, Stack, Tooltip } from "@mui/material";
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

    setMoney(money - recyclerPrice);
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

  function handleEmptySale(saleAmount: number): void {
    setMoney(money + saleAmount);
  }

  return (
    <>
      Money: ${money.toFixed(2)}
      <br />
      <Tooltip title="$600">
        <Button variant="contained" onClick={handleBuyRecycler}>
          Buy recycler
        </Button>
      </Tooltip>
      <p></p>
      <Stack
        justifyContent="space-evenly"
        direction={"row"}
        spacing={2}
        sx={{ flexWrap: "wrap" }}
      >
        {recyclerList.map((recycler) => (
          <RecyclerComponent
            key={recycler.id}
            id={recycler.id}
            onSale={handleEmptySale}
          />
        ))}
      </Stack>
    </>
  );
};

export default ManagerComponent;
