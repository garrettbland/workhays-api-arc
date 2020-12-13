let arc = require("@architect/functions");
let nanoid = require("nanoid").nanoid;

async function handler(request) {
  // returns instance of document client
  const data = await arc.tables();
  const dynamodb = data._doc;
  const TableName = data._name("workhays");
  const params = {
    TableName: TableName,
    Item: {
      pk: `JOB#${nanoid()}`,
      sk: `ACTIVE#JOB`,
      gsi1pk: `ACTIVE#JOB`,
      gsi1sk: Date.now().toString(),
      title: "A job title",
      description: "Work here its great",
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
}

exports.handler = arc.http.async(handler);
