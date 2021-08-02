<blockquote>
    <h3><span>📘</span>This feature is currently in beta</h3>
    <p>To use this feature, pass in a header including the `LD-API-Version` key with value set to `beta`. Use this header with each call.</p>
</blockquote>

The Account Usage API lets you query for metrics about how your account is using LaunchDarkly.
Each endpoint returns time-series data in the form of an array of data points with timestamps. Each one contains data for that time from one or more series. It also includes a metadata array describing what each of the series is.
