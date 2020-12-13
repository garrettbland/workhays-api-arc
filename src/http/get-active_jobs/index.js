let arc = require("@architect/functions");

async function handler(request) {
  const data = await arc.tables();
  const dynamodb = data._doc;
  let TableName = data._name("workhays");

  let params = {
    TableName: TableName,
    IndexName: "gsi1pk-gsi1sk-index",
    KeyConditionExpression: `#pk = :active`,
    ExpressionAttributeNames: {
      "#pk": "gsi1pk",
    },
    ExpressionAttributeValues: {
      ":active": "ACTIVE#JOB",
    },
  };

  let result = await dynamodb.query(params).promise();

  return {
    statusCode: 200,
    headers: {
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "content-type": "application/json; charset=utf8",
    },
    body: JSON.stringify(result),
  };
}

exports.handler = arc.http.async(handler);
