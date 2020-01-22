---
title: "Using the Relay Proxy"
excerpt: ""
---
## Overview
This topic explains how to set up and use the LaunchDarkly Relay Proxy. It also explains the proxy's two modes and gives detail on how to perform flag evaluations with the Relay Proxy.
## Starting the Relay Proxy
You can build and run the Relay Proxy from source or run a Docker image we provide.

### Starting the Relay Proxy from source

To set up the Relay Proxy from source:

1. Install Go 1.6 or higher. To install Go, read [Go's documentation](https://golang.org/doc/install).
2. Build and install the Relay Proxy binary in your `$GOPATH`.
  Use this command to build and install the binary:
[block:code]
{
  "codes": [
    {
      "code": "go get -u gopkg.in/launchdarkly/ld-relay.v5/...",
      "language": "text",
      "name": "Build and install the Relay Proxy"
    }
  ]
}
[/block]
3. Create a new file named `ld-relay.conf`. 
 Include the following text:
[block:code]
{
  "codes": [
    {
      "code": "[main]\n    streamUri = \"https://stream.launchdarkly.com\"\n    baseUri = \"https://app.launchdarkly.com\"\n    eventsUri = \"https://events.launchdarkly.com\"\n    \n[environment \"<YOUR-ENVIRONMENT'S-NAME>\"]\n    sdkKey = \"<YOUR-ENVIRONMENT'S-SDK-KEY>\"",
      "language": "text",
      "name": "ld-relay.conf"
    }
  ]
}
[/block]
You can connect your Relay Proxy to multiple LaunchDarkly environments by specifying multiple environment configurations. Additionally, you can specify client-side IDs and mobile keys if your application connects to LaunchDarkly in a client-side or mobile architecture. For example:
[block:code]
{
  "codes": [
    {
      "code": "[main]\n    streamUri = \"https://stream.launchdarkly.com\"\n    baseUri = \"https://app.launchdarkly.com\"\n    eventsUri = \"https://events.launchdarkly.com\"\n    \n[environment \"Spree Webapp Production\"]\n    sdkKey = \"SPREE_WEB_PROD_API_KEY\"\n    envId = \"SPREE_WEB_PROD_ENV_ID\"\n        \n[environment \"Spree Mobile Production\"]\n    sdkKey = \"SPREE_MOBILE_PROD_API_KEY\"\n    mobileKey = \"SPREE_MOBILE_PROD_MOBILE_KEY\"",
      "language": "text",
      "name": "ld-relay.conf example"
    }
  ]
}
[/block]
To learn more about the supported configuration options, visit [the Relay Proxy Github repository](https://github.com/launchdarkly/ld-relay#configuration-file-format).

Lastly, use this command to run the binary, pointing to your `ld-relay.conf` file:
[block:code]
{
  "codes": [
    {
      "code": "$GOPATH/bin/ld-relay --config ./ld-relay.conf",
      "language": "text",
      "name": "Run the binary"
    }
  ]
}
[/block]

### Starting the Relay Proxy with a Docker image

To start the Relay Proxy with a Docker image, download the `launchdarkly/ld-relay` image from [Docker Hub](https://hub.docker.com/r/launchdarkly/ld-relay) image and run it with the following command:
[block:code]
{
  "codes": [
    {
      "code": "docker run --name ld-relay               \\\n    -e LD_ENV_<ENV_NAME>=\"<ENV_SDK_KEY>\" \\\n    launchdarkly/ld-relay",
      "language": "text",
      "name": "Docker container setup"
    }
  ]
}
[/block]
You can connect your Relay Proxy to multiple LaunchDarkly environments by specifying multiple environment (`-e`) arguments. For example:
[block:code]
{
  "codes": [
    {
      "code": "docker run --name ld-relay           \\\n    -e LD_ENV_stg=\"sdk-stg-sdkKey\"   \\\n    -e LD_ENV_prod=\"sdk-prod-sdkKey\" \\\n    launchdarkly/ld-relay",
      "language": "text",
      "name": "Docker example"
    }
  ]
}
[/block]
To learn more about the supported environment variables, visit [the Relay Proxy Github repository](https://github.com/launchdarkly/ld-relay#docker).

## Configuring an SDK to use the Relay Proxy

You must set three values in your SDK's configuration to connect to your Relay Proxy. Precise steps to set the configuration values depend on your particular SDKs.

The values you must replace are:

* `baseUrl`: Defaults to `launchdarkly.com`.
* `streamUrl`: Defaults to `stream.launchdarkly.com` for server-side SDKS and `clientstream.launchdarkly.com` for client-side and mobile SDKs.
* `eventsUrl`: Defaults to `events.launchdarkly.com`.

The SDK uses these values to determine where to request flag updates. Change all three values to point to the Relay Proxy URL instead of directly to LaunchDarkly's services. 

## Validating your Relay Proxy configuration

After you have configured it, follow the procedure below to validate your Relay Proxy configuration:


1. Start your SDK. If the SDK connects successfully, the proxy is working. 
<Callout intent="alert">
  <CalloutTitle>Look for connection or environment-related erorrs</CalloutTitle>
   <CalloutDescription>Error messages on initialization, including messages saying an environment was not found, can indicate that the proxy is configured incorrectly. These messages can appear when an SDK key cannot be validated or when there is a connection issue to LaunchDarkly.</CalloutDescription>
</Callout>
2. To confirm the proxy is configured correctly, test it by evaluating a feature flag. 
3. In the LaunchDarkly UI, change the value of a feature flag so you will see a different variation in production.
4. Verify in your application that the flag value has changed. 

Alternatively, you can validate your Relay Proxy by using `curl`. Note that you need to specify your Relay Proxy base URL, SDK key, and user details in the command:
[block:code]
{
  "codes": [
    {
      "code": "curl -X REPORT localhost:8030/sdk/eval/user -H \"Authorization: YOUR_SDK_KEY\" -H \"Content-Type: application/json\" -d '{\"key\": \"a00ceb\", \"email\":\"barnie@example.org\"}'",
      "language": "text",
      "name": "curl example"
    }
  ]
}
[/block]

## Using the Relay Proxy in different modes
After you set up the Relay Proxy, you can use it in either **proxy** mode or **daemon** mode. Set a mode for the Relay Proxy by configuring your SDK.

Client-side and mobile SDKs should only use the Relay Proxy in proxy mode. Server-side SDKs can use it in either mode. In daemon mode, the SDK connects directly to the Relay Proxy's datastore, which is not supported for client-side SDKs.

### Using proxy mode

Proxy mode is the most common use case for the LaunchDarkly proxy. The Relay Proxy is set to proxy mode by default.

In this mode, several Relay Proxy instances exist in a high-availability configuration behind a load balancer. Relay Proxy nodes do not need to communicate with each other. There is no master node or cluster. 

You can scale the Relay Proxy horizontally by deploying more nodes behind the load balancer. Do not use a single node in proxy mode.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/081c12e-relay-lb.png",
        "relay-lb.png",
        708,
        320,
        "#c88153"
      ],
      "caption": "The relay proxy arranged in proxy mode."
    }
  ]
}
[/block]
### Using daemon mode

Optionally, you can configure LaunchDarkly SDKs to communicate directly with the Redis store. We recommend this configuration when you're using LaunchDarkly with PHP.

To set the Relay Proxy to daemon mode: 

1. Configure your SDK to use a persistent data store. The SDK and the Relay Proxy must use the same data store.
  To learn more about setting up a persistent data store, read [Using a persistent feature store](./using-a-persistent-feature-store).
2. Configure your SDK to use "LDD mode". To do so, set the `UseLdd` SDK configuration property to `true`. The name of this property is often `UseLdd`, but can vary between SDKs. To learn more about customizing SDK configuration, read the documentation for your SDK. 
<Callout intent="info">
  <CalloutTitle>Restoring the Relay Proxy to proxy mode</CalloutTitle>
   <CalloutDescription>If you have set your Relay Proxy to daemon mode and wish to restore proxy mode, set the `UseLdd` SDK configuration property to `false`. 
In some SDKs, the configuration property you must change is not named `UseLdd`, but that name is the most common. To learn more about customizing SDK configuration, read the documentation for your SDK.</CalloutDescription>
</Callout>
In daemon mode, there is no need to put a load balancer in front of the Relay Proxy. Enable a monitoring service, such as Datadog, when you are using the Relay Proxy in daemon mode. Because the data store communicates directly with the SDKs when the proxy is in in daemon mode, in the event of an outage an external monitoring service provides information about problems that might otherwise be lost.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c5d25cd-relay-daemon.png",
        "relay-daemon.png",
        642,
        335,
        "#c37e50"
      ],
      "caption": "The Relay Proxy arranged in daemon mode."
    }
  ]
}
[/block]

## Securing connections to and from the Relay Proxy

You can secure traffic into the LaunchDarkly Relay Proxy with TLS connections, and also set an environment variable to convey Relay Proxy traffic through another proxy. 

### Securing inbound connections to the Relay Proxy

As a best practice, we recommend enabling TLS on all inbound connections to the Relay Proxy. This ensures that inbound traffic to the Relay Proxy is secure. 

To enable TLS on inbound connections, position the Relay Proxy behind a secure load balancer.

### Passing Relay Proxy traffic through a proxy

In some cases, you may want to pass relay traffic through a proxy when it communicates with LaunchDarkly's services. Go's standard HTTP library provides a built-in HTTPS proxy. 

If you include the `HTTPS_PROXY` environment variable in your configuration, the SDK will proxy all network requests through the URL you provide. Configuration instructions for Mac, Linux, and Windows systems appear below.

Set the `HTTPS_PROXY` environment variable on Mac/Linux systems:
[block:code]
{
  "codes": [
    {
      "code": "export HTTPS_PROXY=https://web-proxy.domain.com:8080",
      "language": "text",
      "name": "Mac and Linux configuration"
    }
  ]
}
[/block]
Set the `HTTPS_PROXY` environment variable on Windows systems:
[block:code]
{
  "codes": [
    {
      "code": "set HTTPS_PROXY=https://web-proxy.domain.com:8080",
      "language": "text",
      "name": "Windows configuration"
    }
  ]
}
[/block]