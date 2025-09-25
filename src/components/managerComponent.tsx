import { Button, Stack, Tooltip } from "@mui/material";
import RecyclerComponent from "./recyclerComponent";
import React, { useEffect, useState } from "react";
import InstructionsComponent from "./instructionsComponent";

type Recycler = {
  id: number;
};

interface props {
  initialMoney: number;
}

const recyclerPrice = 400;

const ManagerComponent = ({ initialMoney }: props) => {
  const [recyclerList, setRecyclerList] = React.useState<Recycler[]>([]);
  const [money, setMoney] = useState(initialMoney);
  const [goal, setGoal] = useState(200);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameOver) {
        setRecyclerList([]);
        return;
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0 && seconds === 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        if (money >= goal) {
          setMinutes(1);
          setGoal(goal + goal * 1.2);
        } else {
          setGameOver(true);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId); // clear the interval when component unmounts
  }, [seconds, minutes, goal, money, gameOver]);

  function formatTime() {
    return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`;
  }

  const timer = formatTime();

  function handleBuyRecycler(): void {
    setGameOver(false);

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

  function handleSale(saleAmount: number): void {
    setMoney(money + saleAmount);
  }

  function restart(): void {
    setRecyclerList([]);
    setMinutes(1);
    setMoney(initialMoney);
    setGoal(400);
    setGameOver(false);
  }

  return (
    <>
      <Stack direction="column" spacing={10}>
        <Stack
          direction="row"
          spacing={10}
          justifyContent={"space-evenly"}
          sx={{ width: "100%", flexGrow: 2 }}
        >

          <h1>Money: ${money.toFixed(2)}</h1>
          <h1>
            Goal: {goal} in {timer}
          </h1>
          {!gameOver && (
            <Tooltip title={recyclerPrice}>
              <Button variant="contained" onClick={handleBuyRecycler} sx={{ height: '50px' }}>
                Buy recycler
              </Button>
            </Tooltip>
          )}

          {gameOver && (
            <Button variant="contained" onClick={restart} sx={{ height: '50px' }}>
              Start game
            </Button>
          )}
        </Stack>

        <p></p>

        <Stack
          justifyContent="end"
          direction={"row"}
          spacing={6}
          sx={{ flexWrap: "wrap" }}
        >
          {recyclerList.map((recycler) => (
            <RecyclerComponent
              key={recycler.id}
              id={recycler.id}
              onSale={handleSale}
            />
          ))}
        </Stack>

      </Stack>

    </>
  );
};

export default ManagerComponent;
