const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
 };

app.use(cors(corsOptions));
app.use(express.json());
app.use("/signup", require("../server/routes/signupAuth"));
app.use("/login", require("../server/routes/logInAuth"));
app.use("/dashboard", require("../server/routes/dashboard"));
app.use("/cart", require("../server/routes/cart"));
app.use("/items", require("../server/routes/items"));
app.use("/orders", require("../server/routes/orders"));
app.use("/home", require("../server/routes/home"));
app.use("/addItem", require("../server/routes/addItem"));
app.use("/myList", require("../server/routes/myList"));
app.use("/messages", require("../server/routes/messages"));
app.use("/search", require("../server/routes/search"));
app.use("/", require("../server/routes/home"));
app.use("/admin", require("../server/routes/admin"));
app.use("/update_profile", require("../server/routes/updateProfile"));



// Start the server
app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
