const { Telegraf, session } = require("telegraf");
const { message } = require("telegraf/filters");
const express = require("express");
const { MongoClient } = require("mongodb");
const axios = require("axios");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("welcome to HomePage");
});

const bot = new Telegraf("6171816776:AAHcBea6m2butZiSVEZXXg3HlduS6U8ISQA");

var a = 1;

bot.start((ctx) => {
  ctx.reply("Welcome! Please enter your name:");
});

let user = {
  name: "",
  city: "",
  country: "",
};

bot.on(message("text"), async (ctx) => {
  switch (a) {
    case 1: {
      ctx.reply(
        `Nice to meet you, ${ctx?.update?.message?.text}! What city are you in?`
      );
      user.name = ctx?.update?.message?.text;
      a = 2;
      break;
    }
    case 2: {
      ctx.reply(`${ctx?.update?.message?.text}! What country are you in?`);
      user.city = ctx?.update?.message?.text;
      a = 3;
      break;
    }
    case 3: {
      user.country = ctx?.update?.message?.text;
      const client = new MongoClient(
        "mongodb+srv://suraj121704c:singh123@cluster0.ndbapyz.mongodb.net/botData?retryWrites=true&w=majority"
      );
      try {
        await client.connect();
        const db = client.db();
        const result = await db.collection("users").insertOne(user);
        // console.log(`User ${result.insertedId} created.`);
      } catch (error) {
        console.error(error);
      } finally {
        await client.close();
      }
      ctx.reply(`Thanks! ${user.name} ... ask about anything from us...`);
      a = 4;
      break;
    }
    case 4: {
      const client = new MongoClient(
        "mongodb+srv://suraj121704c:singh123@cluster0.ndbapyz.mongodb.net/botData?retryWrites=true&w=majority"
      );
      try {
        await client.connect();
        const db = client.db();
        const result = await db
          .collection("users")
          .findOne({ name: user.name });
        let data = await getWeather(result.city, result.country);
        ctx.reply(`${data}`);
      } catch (error) {
        console.error(error.message);
      } finally {
        await client.close();
      }
      a = 5;
      break;
    }
    default: {
      ctx.reply("Welcome! Please enter your name:");
      console.log(user);
      a = 1;
      break;
    }
  }
});

async function getWeather(city, country) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=9f7150b3683b29830c9208107dd3952b&units=metric`;
  const response = await axios.get(url);
  const weather = response.data.weather[0].description;
  const temperature = response.data.main.temp;
  return `The weather in ${city}, ${country} is ${weather} with a temperature of ${temperature} °C.`;
}

console.log("Bot is running...");
bot.launch();

app.use("/users", userRouter);

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));

process.once("SIGTERM", () => bot.stop("SIGTERM"));

app.listen(2000, async () => {
  try {
    await connection;
    console.log("Connected to Atlas Server...");
  } catch (error) {
    console.log(error.message);
  }
  console.log("Server is running at port 8000...");
});
