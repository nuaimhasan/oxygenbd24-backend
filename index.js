const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5000;

// routers
const adminRouter = require("./routes/administratorRoute");

const logoRouter = require("./routes/logoRoutes");
const faviconRouter = require("./routes/faviconRoutes");
const bannerRouter = require("./routes/bannerRoutes");

const aboutRouter = require("./routes/aboutRoutes");
const contactRouter = require("./routes/contactRoutes");

const productRouter = require("./routes/productRoutes");
const rentRouter = require("./routes/rentRoutes");

const themeRouter = require("./routes/themeRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

app.use("/admin", adminRouter);

app.use("/logo", logoRouter);
app.use("/favicon", faviconRouter);
app.use("/banner", bannerRouter);

app.use("/about", aboutRouter);
app.use("/contact", contactRouter);

app.use("/product", productRouter);
app.use("/rent", rentRouter);

app.use("/themes", themeRouter);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
