import * as express from "express";
import * as path from "path";
import * as rateLimit from "express-rate-limit";

const app = express();
const port = process.env.PORT || 80;
// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to all requests
app.use(limiter);

app.use(express.static(path.join(__dirname, "")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
