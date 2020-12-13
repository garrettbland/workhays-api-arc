# Work Hays API

> Workhays serverless infrastructure using architect

## Local Development

1. `npm install -g @architect/architect`
2. `arc sandbox`

## Deployment

### Notes

- After adding/updating `app.arc`, run `arc init`. This will initiate and build your new resources. This command is meant to be used & reused.

- Executing `arc package` will generate `sam.json` so you can look though
  the cloudformation. This helped figure out the GSI issue

- Secondary indexes are named after the primary key followed by `-index`. The following GSI's would be be `owner-name-index` and `email-index`

```
@tables
cats
  catID *String

@indexes
cats
  owner *String
  name **String

cats
  email *String
```
