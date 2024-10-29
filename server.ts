import * as express from "express";
import * as path from "path";

const app = express();
const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, "")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
