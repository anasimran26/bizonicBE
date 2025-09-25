const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const customerRoutes = require("./routes/customer");
const businessRoutes = require("./routes/business");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => res.redirect("/auth/login"));

// Auth routes
app.use("/auth", authRoutes);

// App routes
app.use("/items", itemRoutes);
app.use("/customers", customerRoutes);
app.use("/business", businessRoutes);

module.exports = app;
