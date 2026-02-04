const express = require("express");
const cors = require("cors");
const util = require("minecraft-server-util");

const app = express();
app.use(cors());

app.get("/ping", async (req, res) => {
  const { ip, port, type } = req.query;

  if (!ip || !port) {
    return res.json({ online: false });
  }

  try {
    let result;

    if (type === "bedrock") {
      result = await util.statusBedrock(ip, Number(port));
    } else {
      result = await util.status(ip, Number(port));
    }

    res.json({
      online: true,
      ping: result.roundTripLatency
    });
  } catch (e) {
    res.json({ online: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Minecraft Ping API running on port " + PORT)
);
