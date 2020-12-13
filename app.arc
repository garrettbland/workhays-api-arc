@app
workays-api

@aws
profile default
region us-east-1

@http
get /
get /jobs
get /active-jobs
post /jobs
get /jobs/:id
get /*

@tables
workhays
  pk *String
  sk **String
  TTL TTL

@indexes
workhays
  gsi1pk *String
  gsi1sk **String

workhays
  gsi2pk *String
  gsi2sk **String

workhays
  gsi3pk *String
  gsi3sk **String