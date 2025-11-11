// ...existing code...
exports.handler = async (event, context) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  if (event.httpMethod === "GET") {
    const params = event.queryStringParameters || {};
    const mode = params["hub.mode"];
    const token = params["hub.verify_token"];
    const challenge = params["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK VERIFIED");
      return {
        statusCode: 200,
        body: challenge,
      };
    } else {
      return {
        statusCode: 403,
        body: "Forbidden",
      };
    }
  }

  if (event.httpMethod === "POST") {
    let body;
    try {
      body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    } catch (err) {
      console.warn("Failed to parse JSON body:", err);
      body = event.body;
    }

    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(body, null, 2));

    return {
      statusCode: 200,
      body: "OK",
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed",
  };
};
// ...existing code...