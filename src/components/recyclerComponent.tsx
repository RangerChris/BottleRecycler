import {
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Customer from "../domain/customer";
import { useEffect, useState } from "react";
import { BottleType } from "../domain/Bottle";

interface props {
  id: number;
  onSale: (saleAmount: number) => void;
}

enum recyclerState {
  Stopped = "Stopped",
  Running = "Running",
  Full = "Full",
  Error = "Error",
}

const RecyclerComponent = ({ id, onSale }: props) => {
  const [plasticBottles, setPlasticBottles] = useState(0);
  const [glassBottles, setGlassBottles] = useState(0);
  const [metalBottles, setMetalBottles] = useState(0);
  const [Jam, setJam] = useState(false);
  const [customer, setCustomer] = useState<Customer>();
  const [customerCounter, setCustomerCounter] = useState<number>(1);
  const [customerQueue, setCustomerQueue] = useState<Customer[]>([]);
  const [state, setState] = useState(recyclerState.Stopped);
  const [progress, setProgress] = useState<number | undefined>(0);

  const maxBottles = 100;

  useEffect(() => {
    const recyclerLoop = () => {
      ProcessCustomer();
      setProgress(customer?.TotalBottles);

      if (
        glassBottles >= maxBottles ||
        metalBottles >= maxBottles ||
        plasticBottles >= maxBottles
      ) {
        setState(recyclerState.Full);
      }

      if (customerQueue.length <= 4) {
        CheckForNewCustomer(generateRandomCustomer);
      }

      if (state == recyclerState.Running) {
        const chance = 0.01; // 1% chance of a jam
        if (Math.random() < chance) {
          setState(recyclerState.Error);
          setJam(true);
        }
      }
    };
    const intervalId = setInterval(recyclerLoop, 400);

    return () => {
      clearInterval(intervalId);
    };

    function generateRandomCustomer(): Customer {
      setCustomerCounter(customerCounter + 1);
      const newCustomer = new Customer(customerCounter);
      newCustomer.SetRandomNumberOfBottles();
      setCustomerQueue([...customerQueue, newCustomer]);

      return newCustomer;
    }

    function ProcessCustomer(): void {
      if (customerQueue.length == 0 || state != recyclerState.Running) {
        return;
      }

      const nextBottle = customerQueue.at(0)?.GetNextBottle();
      if (nextBottle == null) {
        // Remove first customer from queue
        setCustomerQueue([...customerQueue.slice(1)]);
        return;
      }

      setCustomer(customerQueue.at(0));
      if (nextBottle.Type == BottleType.Plastic) {
        setPlasticBottles(plasticBottles + 1);
      }

      if (nextBottle.Type == BottleType.Glass) {
        setGlassBottles(glassBottles + 1);
      }

      if (nextBottle.Type == BottleType.Metal) {
        setMetalBottles(metalBottles + 1);
      }
    }
  }, [
    customer?.TotalBottles,
    customerCounter,
    customerQueue,
    glassBottles,
    metalBottles,
    plasticBottles,
    state,
  ]);

  function handleStartStop(): void {
    if (state === recyclerState.Stopped) {
      setState(recyclerState.Running);

      return;
    }

    if (state === recyclerState.Running) {
      setState(recyclerState.Stopped);
      return;
    }
  }

  function handleEmpty(): void {
    const sale = (plasticBottles + metalBottles + glassBottles) * 1.75;
    onSale(sale);
    setPlasticBottles(0);
    setMetalBottles(0);
    setGlassBottles(0);
    setState(recyclerState.Stopped);
  }

  function handleJam(): void {
    setJam(false);
    setState(recyclerState.Stopped);
  }

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Recycler {id}
        </Typography>
        Customers in queue: {customerQueue.length}
        <br />
        Customer {customerQueue?.at(0)?.Id} progress
        <br />
        <LinearProgress variant="determinate" value={progress} />
        {progress}
        <p></p>
        <List>
          <ListItem>
            <ListItemText primary="Status" secondary={state} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Glass" secondary={glassBottles} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(glassBottles / maxBottles) * 100}
          />
          <ListItem>
            <ListItemText primary="Plastic" secondary={plasticBottles} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(plasticBottles / maxBottles) * 100}
          />
          <ListItem>
            <ListItemText primary="Metal" secondary={metalBottles} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(metalBottles / maxBottles) * 100}
          />
        </List>
      </CardContent>
      <CardActions>
        <Tooltip title="Starts or stops the recycler">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleStartStop();
            }}
          >
            {state === recyclerState.Stopped ? "Start" : "Stop"}
          </Button>
        </Tooltip>
        <Tooltip title="Fix a jam and reset the recycler">
          <Button
            variant="contained"
            size="small"
            onClick={handleJam}
            color={state === recyclerState.Error ? "error" : "primary"}
          >
            Fix
          </Button>
        </Tooltip>
        <Tooltip title="Empties the bottle containers and sell them, in order to make room for more bottles. Takes 3 seconds">
          <Button variant="contained" size="small" onClick={handleEmpty}>
            Empty
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default RecyclerComponent;

function CheckForNewCustomer(generateRandomCustomer: () => Customer) {
  const chance = 0.05; // 5% change of new customer
  if (Math.random() < chance) {
    generateRandomCustomer();
  }
}
