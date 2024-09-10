import {
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface props {
  id: number;
}

const Recycler = ({ id }: props) => {
  const maxBottles = 500;
  const status: string = "Running";
  const glass = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
  const plastic = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
  const metal = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
  const progress = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Recycler {id}
        </Typography>
        Customer progress
        <br />
        <LinearProgress variant="determinate" value={progress} />
        <p></p>
        <List>
          <ListItem>
            <ListItemText primary="Status" secondary={status} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Glass" secondary={glass} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(glass / maxBottles) * 100}
          />
          <ListItem>
            <ListItemText primary="Plastic" secondary={plastic} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(plastic / maxBottles) * 100}
          />
          <ListItem>
            <ListItemText primary="Metal" secondary={metal} />
          </ListItem>
          <LinearProgress
            variant="determinate"
            value={(metal / maxBottles) * 100}
          />
        </List>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Start
        </Button>
        <Button variant="contained" size="small">
          Fix
        </Button>
        <Button variant="contained" size="small">
          Empty
        </Button>
      </CardActions>
    </Card>
  );
};

export default Recycler;
