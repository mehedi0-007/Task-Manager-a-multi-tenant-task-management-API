import connectDB from "./config/db.js";
import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT;

const server = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  } catch {
    console.log("Server side error");
  }
};

export default server;
