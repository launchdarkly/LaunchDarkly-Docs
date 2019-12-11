---
title: "Analytics data stream (ADS)"
excerpt: ""
---
[block:callout]
{
  "type": "info",
  "title": "Available to enterprise customers",
  "body": "The Analytics data stream (ADS) is only available to certain customers on our enterprise plans. If you're interested in learning more about our enterprise plans, contact [sales@launchdarkly.com](mailto:sales@launchdarkly.com?Subject=ADS)."
}
[/block]
The Analytics data stream (ADS) provides a real-time stream of raw analytics data, including feature flag requests, analytics events, custom events, and more.  
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/PBFKud8MTLCUTLh2QM7k_eventstream.jpg",
        "eventstream.jpg",
        "1997",
        "806",
        "#066cf0",
        ""
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Connecting to the ADS"
}
[/block]
The ADS uses the [Server-sent events protocol](https://en.wikipedia.org/wiki/Server-sent_events). If the API is enabled for your account, you can access the stream by connecting to `firehose.launchdarkly.com` with any HTTP client. For example, here's how to connect to the stream using `cURL`:
[block:code]
{
  "codes": [
    {
      "code": "curl -H \"Authorization: <Your Environment's SDK Key>\" -H \"Accept: text/event-stream\" https://firehose.launchdarkly.com",
      "language": "curl"
    }
  ]
}
[/block]
The SDK keys for your environments are found [here](https://app.launchdarkly.com/settings#/projects)

Client libraries for server-sent events exist for many platforms. Here are some libraries we recommend:

* Java: [okhttp-eventsource](https://github.com/launchdarkly/okhttp-eventsource)
* Ruby: [celluloid-eventsource](https://github.com/launchdarkly/celluloid-eventsource)
* Go: [eventsource](https://github.com/launchdarkly/eventsource)
* Node: [eventsource](https://github.com/aslakhellesoy/eventsource)
* C#: [eventsource](https://github.com/launchdarkly/dotnet-eventsource)
[block:api-header]
{
  "type": "basic",
  "title": "Events payload"
}
[/block]
The stream will contain standard server-sent event payloads. The event name will be `put`, and the data will be a JSON payload consisting of an array of events. For example
[block:code]
{
  "codes": [
    {
      "code": "event: put\ndata: [{\"creationDate\":1.467145812601e+12,\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\",\"kind\":\"identify\",\"user\":{\"anonymous\":true,\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\"}}]\n\nevent: put\ndata: [{\"creationDate\":1.46714581449e+12,\"key\":\"54ac2ec7de674204ddd610a5\",\"kind\":\"click\",\"url\":\"http://sandbox.launchdarkly.com/\",\"user\":{\"anonymous\":true,\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\"}},{\"creationDate\":1.467145813187e+12,\"key\":\"hover\",\"kind\":\"custom\",\"url\":\"http://sandbox.launchdarkly.com/\",\"user\":{\"anonymous\":true,\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\"}}]\n\nevent: put\ndata: [{\"creationDate\":1.467145815597e+12,\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\",\"kind\":\"identify\",\"user\":{\"anonymous\":true,\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\"}}]\n\nevent: put\ndata: [{\"creationDate\":1.467145811197e+12,\"key\":\"sort.order\",\"kind\":\"feature\",\"user\":{\"anonymous\":true,\"custom\":{\"groups\":null},\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\"},\"value\":true},{\"creationDate\":1.467145811416e+12,\"key\":\"image.hover\",\"kind\":\"feature\",\"user\":{\"anonymous\":true,\"custom\":{\"groups\":null},\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\"},\"value\":false},{\"creationDate\":1.467145814799e+12,\"key\":\"alternate.page\",\"kind\":\"feature\",\"user\":{\"anonymous\":true,\"custom\":{\"groups\":null},\"key\":\"3ea13b3b-6bb9-4237-8fb9-6a182d4c1e5f\"},\"value\":true}]",
      "language": "text"
    }
  ]
}
[/block]
The [Analytics Data Stream Reference](doc:analytics-data-stream-reference) contains more details on event kinds and their schemas.