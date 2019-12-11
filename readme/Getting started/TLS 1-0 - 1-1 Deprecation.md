---
title: "TLS 1.0 / 1.1 Deprecation"
excerpt: ""
---
[block:callout]
{
  "type": "danger",
  "title": "Upgrading to TLS 1.2 or higher",
  "body": "Our vendor Fastly is deprecating support for TLS 1.0 / 1.1 for security reasons. As a result, they are requiring that all of our customers upgrade to TLS 1.2 or higher. \n\nThe deadline to upgrade is **TBD**. Please contact support@launchdarkly.com if you have any concerns about meet this deadline."
}
[/block]
On [DATE TBD], LaunchDarkly will deprecate support for TLS 1.0/1.1 due to requirements imposed by our vendor Fastly. 

Fastly has written a blog post regarding deprecation for TLS 1.0/1.1 that can be referenced for additional details: https://www.fastly.com/blog/phase-two-our-tls-10-and-11-deprecation-plan
Note that we have already secured a special extension beyond the date that Fastly notes in this article.
[block:api-header]
{
  "title": "Importance of upgrading"
}
[/block]
Many vulnerabilities have surfaced over the past couple of years that compromise the secure connection established between a user's browser and the applications they use. TLS 1.0/1.1 were once considered "highly secure" and became less so as additional vulnerabilities surfaced. As a result, an update is required to address this change. 

You may find the TLS Protocol 1.2 memo put out by the Network Working Group to be a helpful reference: https://tools.ietf.org/html/rfc5246 
[block:api-header]
{
  "title": "Steps to upgrade"
}
[/block]
You will need to make sure that your coding language platforms/libraries support TLS 1.2 or higher. 

Your technology may be up to date, but it is possible you currently have or will have end users who are causing TLS 1.0/1.1 traffic. Once fastly has deprecated support for TLS 1.0/1.1, the impact to these end users would be that existing SDK clients using old versions of TLS will no longer receive updates, and new clients will not be able to connect at all. 
[block:api-header]
{
  "title": "Code language platform/library compatiblity"
}
[/block]
Our SDKs utilize the underlying networking provided by the platform or library that you are using for network requests. Older versions of language platforms/libraries may not support TLS 1.2 or higher and will need to be upgraded. 

You should consult your programming language and operating system documentation to determine whether there’s support for TLS 1.2. 

Paypal released a guide which provides a helpful reference for many languages. The link to the original material on Github is below and some of this text is included inline. Some information here has been edited specific to actions required with upgrading your LaunchDarkly SDK.
[block:embed]
{
  "html": false,
  "url": "https://github.com/paypal/TLS-update",
  "title": "paypal/TLS-update",
  "favicon": "https://assets-cdn.github.com/favicon.ico",
  "image": "https://avatars3.githubusercontent.com/u/476675?s=400&v=4"
}
[/block]
##Paypal TLSv1.2 Update Guide

### Java

#### Java requirements

> **Note:** Java 8 is preferred because TLSv1.2 is the default in this Java version.

| Java&nbsp;version | TLSv1.2&nbsp;support | Requirements |
|:--------------|:-----------------|:--------------|
| 5&nbsp;and&nbsp;earlier | No support | <p>Upgrade to Java 6 or later.</p><blockquote><strong>Note:</strong> Java 8 is preferred because TLSv1.2 is the default in this Java version.</blockquote> |
| 6 | Available | <ul><li>You must explicitly enable TLSv1.2.</li><li>At least [Oracle Java version `6u115 b32`](http://www.oracle.com/technetwork/java/javase/documentation/overview-156328.html) or [IBM V6 service refresh 10](http://www-01.ibm.com/support/knowledgecenter/SSYKE2_6.0.0/com.ibm.java.security.component.60.doc/security-component/jsse2Docs/overrideSSLprotocol.html).</li></ul> |
| 7 | Available | <ul><li>You must explicitly enable TLSv1.2.</li></ul> |
| 8 | Default | <ul><li>No code change is required.</li></ul> |

#### To verify your Java and TLS versions

1. Set the TLS version through the [`SSLContext`](http://docs.oracle.com/javase/7/docs/api/javax/net/ssl/SSLContext.html) class.

1. Verify that Java runtime 6 or later is installed:

    ```
    java -version
    ```

    If you have Java version 5 or earlier, upgrade it. 

    > **Note:** Java 8 is preferred because TLSv1.2 is the default in this Java version.

1. Download the [TlsCheck.java and TlsCheck.jar](java) files.

1. In a shell on your **production system**, run:

    ```
    > java -jar TlsCheck.jar
    ```

    * On success:

        ```
        Successfully connected to TLS 1.2 endpoint.
        ```

    * On failure:

        ```
        Failed to connect to TLS 1.2 endpoint.
        ```
* * *

### .NET

#### .NET requirements

To enable TLSv1.2, you must install the .NET framework 4.5 or later.

Customers using LaunchDarkly with .NET Framework 4.5.x will need to update to LaunchDarkly .NET SDK [INSERT VERSION HERE]. Failure to upgrade will result in the LaunchDarkly SDK returning default values for those applications after [DEPRECATION DATE HERE]

### PHP

#### PHP requirements

* PHP uses the system-supplied cURL library, which requires OpenSSL 1.0.1c or later. 
* You might need to [update your SSL/TLS libraries](http://curl.haxx.se/docs/ssl-compared.html).

#### Guidelines

Find OpenSSL in these locations:

1. OpenSSL installed in your operating system's `openssl version`.
1. OpenSSL extension installed in your PHP. Find this in your `php.ini`.
1. OpenSSL used by PHP_CURL.`curl_version()`. <a id="option-3"></a> 

These OpenSSL extensions can be different, and you update each one separately.

The PHP_CURL OpenSSL extension must support TLSv1.2.

The `php_curl` library uses its own version of the OpenSSL library, which is not the same version that PHP uses, which is the `openssl.so` file in `php.ini`.

#### To verify your PHP and TLS versions

1. To find the `openssl_version` information for cURL, run:

    ```
    php -r 'echo json_encode(curl_version(), JSON_PRETTY_PRINT);'
    ```

    The returned `php_curl` version might be different from the `openssl version` because they are different components.

1. When you update your OpenSSL libraries, you must update the `php_curl` OpenSSL version and not the OS OpenSSL version.

1. Download [cacert.pem](php/cacert.pem) and [TlsCheck.php](php/TlsCheck.php).

1. In a shell on your **production system**, run:

    ```
    php -f TlsCheck.php
    ```
* * *

### Python

* [Python requirements](#python-requirements)
* [To verify your Python and TLS versions](#to-verify-your-python-and-tls-versions)

#### Python requirements

* Python uses the system-supplied OpenSSL. 
* TLSv1.2 requires OpenSSL 1.0.1c or later.

#### To verify your Python and TLS versions

1. In a shell on your **production system**, run the command for your environment: 

    * For Python 2.x:

        ```
        $ python -c "import urllib2; print(urllib2.urlopen('https://tlstest.paypal.com/').read())"
        ```

    * For Python 3.x:

        ```
        $ python -c "import urllib.request; print(urllib.request.urlopen('https://tlstest.paypal.com/').read())"
        ```

        * On success:
            
            ```
            PayPal_Connection_OK
            ```
        
        * On failure, an `URLError` is raised:
            
            ```
            urllib2.URLError: <urlopen error EOF occurred in violation of protocol (_ssl.c:590)>
            urllib2.URLError: <urlopen error [Errno 54] Connection reset by peer>
            ```

* * *

### Ruby

#### Ruby requirements

* Ruby 2.0.0 or later and OpenSSL 1.0.1c or later are required:
    
    * Ruby 2.0.0 or later is required to use TLSv1.2 from the system-supplied OpenSSL.
    * TLSv1.2 requires OpenSSL 1.0.1c or later.

* To update your dependencies, you might need to run `bundle update`.

#### To verify your Ruby and TLS versions

1. In a shell on your **production system**, run:

    ```
    $ ruby -r'net/http' -e 'puts Net::HTTP.get(URI("https://tlstest.paypal.com/"))'
    ```

    * On success:
    
        ```
        PayPal_Connection_OK
        ```

    * On failure, a `OpenSSL::SSL::SSLError` or `EOFError` is thrown.

* * *

### Node

#### Node requirements

* Node.js uses the system supplied OpenSSL.
* TLSv1.2 requires OpenSSL 1.0.1c or later.

#### To verify your Node and TLS versions

1. In a shell on your **production system**, run:

    ```
    $ node -e "var https = require('https'); https.get('https://tlstest.paypal.com/', function(res){ console.log(res.statusCode) });"
    ```

    * On success:
        
        ```
        200
        ```
    * On failure, a network error occurs.

* * *

## Mobile Apps

### Android

#### Android requirements

TLS v1.2 became the default in Android API 20 (Android 5.0 / KitKat), but has been supported since Android API 16 (Android 4.1 / Jelly Bean). 

Customers supporting devices running Android 4.4 or older will need to upgrade their LaunchDarkly Android SDK in order for those devices to maintain a connection with our LaunchDarkly service. 

**Failure to upgrade will result in the LaunchDarkly SDK returning default values after [DEPRECATION DATE HERE]**

### iOS

Since iOS 5, iOS has supported TLS v1.2. The LaunchDarkly iOS SDK currently supports iOS 8.0 and higher. TLS v1.2 became the default minimum supported TLS version with iOS 10, although it is possible to override the TLS version.

Ensure that App Transport Security (ATS) is enabled for your app, and that the app is not configured to override the TLS version for any LaunchDarkly domains.

[App Transport Security (ATS) reference](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33) 
[block:api-header]
{
  "title": "Browser compatibility"
}
[/block]
Your end users and anyone using the LaunchDarkly website will need to be using the latest version of any major supported browsers, which use TLS 1.2 and have safeguards built in to protect against known vulnerabilities.

The following link provides a resource for checking your browser's TLS compatibility: https://www.ssllabs.com/

Wikipedia TLS entry contains a helpful browser compatibility chart: https://en.wikipedia.org/wiki/Transport_Layer_Security#Web_browsers