# Britter

A social media site made for the British as a place to complain about the weather.

## Purpose

This site was created to further my understanding in bringing dynamic applications to the web using Workers, having never previously incorporated one into a project.

## Build Status

Build is complete for the original project scope.
Future developments should include:
* The ability to post formats other than plain text. i.e images, videos.
* User accounts for posting & commenting.  
* Feed to include weather related news articles or other relevent 3rd party content.

## Technology Used/ API References

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
A [Cloudflare](https://cloudflareworkers.com) worker has been used to intercept fetch requests, with Workers KV storing post content.
Weather data is sourced from [OpenWeather](https://openweathermap.org).

