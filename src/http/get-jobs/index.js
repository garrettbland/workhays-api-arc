let arc = require("@architect/functions");
// const AWS = require("aws-sdk");
// let dynamodb = new AWS.DynamoDB.DocumentClient();

async function handler(request) {
  const data = await arc.tables();
  // returns instance of document client
  const dynamodb = data._doc;

  // gets tablename. Needed to use with documentclient
  let TableName = data._name("workhays");

  let params = {
    TableName: TableName,
  };

  let result = await dynamodb.scan(params).promise();

  // let data = await arc.tables();
  // let result = await data.workhays.scan({});

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
