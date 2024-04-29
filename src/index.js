const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const UserRoute = require('./routes/v1/user.route');
const StudentRoute = require('./routes/v1/student.route');

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use('/api/v1/user',UserRoute);
app.use('/api/v1/student',StudentRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Uplift Backend Service." });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
