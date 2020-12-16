let arc = require("@architect/functions");
let nanoid = require("nanoid").nanoid;

async function handler(request) {
  try {
    if (!request.body.title || !request.body.description) {
      throw new Error("Body must include (title) and (description)");
    }

    // returns instance of document client
    const data = await arc.tables();
    const dynamodb = data._doc;
    const TableName = data._name("workhays");
    const params = {
      TableName: TableName,
      Item: {
        pk: `JOB#${nanoid()}`,
        sk: `${
          request.body.status ? request.body.status.toUpperCase() : "ACTIVE"
        }#JOB`,
        gsi1pk: `${
          request.body.status ? request.body.status.toUpperCase() : "ACTIVE"
        }#JOB`,
        gsi1sk: Date.now().toString(),
        title: request.body.title,
        description: request.body.description,
      },
    };

    const response = await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        "cache-control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        "content-type": "application/json; charset=utf8",
      },
      body: JSON.stringify({
        ...response,
        ...params.Item,
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        "cache-control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        "content-type": "application/json; charset=utf8",
      },
      body: JSON.stringify({ message: err.message }),
    };
  }
}

exports.handler = arc.http.async(handler);
