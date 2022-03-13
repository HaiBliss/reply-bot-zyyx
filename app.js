const { App } = require("@slack/bolt");
require("dotenv").config();
// Khởi tạo ứng dụng bằng bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
//   socketMode:true,
//   appToken: process.env.APP_TOKEN
});

// read JSON
const fs = require('fs')
let raw = fs.readFileSync('db.json');
let faqs= JSON.parse(raw);

// app.command("/knowledge", async ({ command, ack, say }) => {
//     try {
//       await ack();
//       say("Yaaay! that command works!");
//     } catch (error) {
//         console.log("err")
//       console.error(error);
//     }
// });

app.event('reaction_added', async ({ event, client, logger, say }) => {
    try {
        console.log(event);
        say(JSON.stringify(event));
      // Call chat.postMessage with the built-in client
      /*
       const result = await client.chat.postMessage({
         channel: welcomeChannelId,
         text: `Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.`
       });
       logger.info(result); */
    }
    catch (error) {
      logger.error(error);
    }
});

app.event('reaction_removed', async ({ event, client, logger, say }) => {
    try {
        console.log(event);
        say(JSON.stringify(event));
    }
    catch (error) {
      logger.error(error);
    }
});

app.event('message', async ({ event, client, logger, say, body, message }) => {
    try {
        console.log(event);
        if (!event.subtype) {
          say(JSON.stringify(event));
        } else {
          say("subtype: " +event.subtype);
        }
    }
    catch (error) {
      logger.error(error);
    }
});

app.message(/hey/, async ({ command, say }) => {
    try {
      say("Yaaay! that command works!");
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

app.command("/knowledge", async ({ command, ack, say }) => {
    try {
      await ack();
      let message = { blocks: [] };
      faqs.data.map((faq) => {
        message.blocks.push(
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Question❓*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: faq.question,
            },
          },
          {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Answer ✅*",
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: faq.answer,
              },
            }
        );
      });
      say(message);
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });

  app.message(/products/, async ({ command, say }) => {
    try {
      let message = { blocks: [] };
      const productsFAQs = faqs.data.filter((faq) => faq.keyword === "products");
  
      productsFAQs.map((faq) => {
        message.blocks.push(
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Question ❓*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: faq.question,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Answer 📖*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: faq.answer,
            },
          }
        );
      });
  
      say(message);
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });

  app.command("/update", async ({ command, ack, say }) => {
    try {
      await ack();
      const data = command.text.split("|");
      const newFAQ = {
        keyword: data[0].trim(),
        question: data[1].trim(),
        answer: data[2].trim(),
      };
      // save data to db.json
      fs.readFile("db.json", function (err, data) {
        const json = JSON.parse(data);
        json.data.push(newFAQ);
        fs.writeFile("db.json", JSON.stringify(json), function (err) {
          if (err) throw err;
          console.log("Successfully saved to db.json!");
        });
      });
      say(`You've added a new FAQ with the keyword *${newFAQ.keyword}.*`);
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });

(async () => {
  const port = 3000
  // Start app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();