const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000', // Directly specify the origin
    credentials: true, // Allows cookies / credentials to be sent
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
app.use("/", require("../server/routes/home"));



// Start the server
app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
