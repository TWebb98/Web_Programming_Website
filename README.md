# Group 1 Final Project

## Website: <http://ec2-18-116-98-51.us-east-2.compute.amazonaws.com/>

## Project File Structure

- project-app/
  - package.json
  - node_modules/
  - models/
    - discussions.js
  - public/
    - favicon.ico
    - index.html
    - manifest.json
    - robots.txt
  - src/
    - App.cs
    - App.js
    - App.test.js
    - DataFetcher.js
    - index.css
    - logo.svg
    - reportWebVitals.js
    - server.js
    - setupTests/
    - assets/
      - logo.png
    - pages/
      - DiscussionsPage.js
      - Home.js
  - server.js

## Project Overview

This web application creates a discussion forum to talk about video games.

When entering the website the user is brought to the homepage where an introduction message and the site's logo are displayed. The user is instructed to navigate to the discussions page to create, view, and participate in discussions.

The discussions page functions by fetching the discussion collection from our mongoDB instance and displaying all initial posts along with their replies. Above the discussions are input boxes where users can put in the title and content of the discussion they want to start. Then, each posted discussion has a reply box that allows users to submit the content of a reply they want to attach to that post.

## Setup Instructions

This web app can be accessed by following the link located at the top of this document.

## API Documentation

<https://documenter.getpostman.com/view/40263813/2sAYBbepF2>
