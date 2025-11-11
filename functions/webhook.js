exports.handler = async (event) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  if (event.httpMethod === "GET") {
    const mode = event.queryStringParameters["hub.mode"];
    const token = event.queryStringParameters["hub.verify_token"];
    const challenge = event.queryStringParameters["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
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

  return {
    statusCode: 404,
    body: "Not Found",
  };
};
