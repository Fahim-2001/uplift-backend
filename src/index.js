const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

const UserRoute = require('./routes/v1/user.route');
const StudentRoute = require('./routes/v1/student.route');
const AuthRoute = require('./routes/v1/auth.route');
const ProgramRoute= require('./routes/v1/program.route');
const InstructorRoute= require('./routes/v1/instructor.route');

// app.use(express.json());
const corsConfig = {
    origin: '',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1/user',UserRoute);
app.use('/api/v1/student',StudentRoute);
app.use('/api/v1/auth',AuthRoute);
app.use('/api/v1/program',ProgramRoute);
app.use('/api/v1/instructor',InstructorRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Uplift Backend Service." });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
