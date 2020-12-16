# Work Hays API

> Workhays serverless infrastructure using architect

## Local Development

1. `npm install -g @architect/architect`
2. `arc sandbox`

## Deployment

- Deploy to staging `arc deploy`
- Deploy to production `arc deploy --production`

### Notes

- After adding/updating `app.arc`, run `arc init`. This will initiate and build your new resources. This command is meant to be used & reused.

- Executing `arc package` will generate `sam.json` so you can look though
  the cloudformation. This helped figure out the GSI issue

- Secondary indexes are named with the following pattern `PARTIION_KEY-SORT_KEY-index`. The following GSI's would be be `owner-name-index` and `email-index`. Index name overridding is currently an open issue. https://github.com/architect/package/pull/92

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
