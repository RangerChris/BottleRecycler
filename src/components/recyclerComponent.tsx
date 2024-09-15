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
import Recycler from "../domain/recycler";

interface props {
  id: number;
}

const RecyclerComponent = ({ id }: props) => {
  const recycler: Recycler = new Recycler(id);
  const maxBottles = 500;
  const progress = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  const customerQueue: Customer[] = [];

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Recycler {id}
        </Typography>
        Customers in queue: {customerQueue.length}
        <br />
        Customer {customerQueue[0]?.Id} progress
        <br />
        <LinearProgress variant="determinate" value={progress} />
        <p></p>
        <List>
          <ListItem>
            <ListItemText primary="Status" secondary={recycler.State} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Glass" secondary={recycler.GlassBottles} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(recycler.GlassBottles / maxBottles) * 100}
          />
          <ListItem>
            <ListItemText
              primary="Plastic"
              secondary={recycler.PlasticBottles}
            />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(recycler.PlasticBottles / maxBottles) * 100}
          />
          <ListItem>
            <ListItemText primary="Metal" secondary={recycler.MetalBottles} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(recycler.MetalBottles / maxBottles) * 100}
          />
        </List>
      </CardContent>
      <CardActions>
        <Tooltip title="Starts or stops the recycler">
          <Button variant="contained" size="small">
            Start
          </Button>
        </Tooltip>
        <Tooltip title="Fix a jam and reset the recycler">
          <Button variant="contained" size="small">
            Fix
          </Button>
        </Tooltip>
        <Tooltip title="Empties the bottle containers to make room for more">
          <Button variant="contained" size="small">
            Empty
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default RecyclerComponent;
