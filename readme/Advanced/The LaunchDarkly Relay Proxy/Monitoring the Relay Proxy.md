---
title: "Monitoring the Relay Proxy"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
This topic explains best practices for monitoring the LaunchDarkly Relay Proxy as it runs, as well as information about exporting metrics and other data.
[block:api-header]
{
  "title": "Monitoring the Relay Proxy's performance"
}
[/block]
When the Relay Proxy is running, you can monitor performance by tracking the following statistics:
* Overall memory utilization
* CPU utilization
* Number of requests coming into the Relay Proxy

These numbers help you understand how frequently the proxy is used and how resource-intensive it is. 

### Monitoring the proxy with a data store

If you have connected the Relay Proxy to a data store, you should also monitor the capacity of the data store and how many hits or misses occur during data lookups. If there are a lot of misses and/or the data store is nearing capacity, it may be overflowing during high-traffic periods and need more capacity.

To learn more about monitoring your datastore, read the documentation from your datastore provider.
[block:api-header]
{
  "title": "Exporting metrics and traces"
}
[/block]
You can configure the Relay Proxy to export statistics, requests received, and route traces to Datadog, Stackdriver, and Prometheus by using the OpenCensus protocol. 
[block:callout]
{
  "type": "warning",
  "title": "You cannot export metrics and traces about the Relay Proxy from LaunchDarkly",
  "body": "You can only export Relay Proxy-related metrics with the OpenCensus protocol. The core LaunchDarkly app and API do not export data in this way."
}
[/block]
To learn more about configuring the Relay Proxy to export metrics and traces, read the instructions in our [GitHub repository](https://github.com/launchdarkly/ld-relay#exporting-metrics-and-traces).