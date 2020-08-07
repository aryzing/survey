# Attest FE technical challenge

This is a boilerplate for Attest's FE technical challenge.

## Description

Attest is a platform where users can design and send surveys to the public. The Attest platform will then collect responses from many users; your task is to represent the results of a completed survey and allow the user to filter the data.

You will need to retrieve and represent survey data which contains the question and answers from the respondents. Information on the respondents that answered the survey is also provided, you will need to use this information to filter the responses. The data provided may not match the designs exactly.

A design has been provided which you will need to implement, the design is a guideline to see how well you can translate a design into code. You are free to be creative and improve the experience for the user where you see appropriate (improvements are not mandatory).

The sidebar on the right of the design is used to filter the data, i.e. clicking "London" will change the responses shown on the left to only display the responses of users that match the filters selected.

Complete test coverage is not mandatory but you will need to add some unit tests.

You will need to:

- Use the mock API to retrieve survey and filter data
- Selecting a filter in the sidebar should filter the responses displayed
- Deselecting all filters should display all responses for the question
- Care about the quality of your code, for example add unit tests.

## Rules

- No frameworks; this means no React, Vue or Angular
- TypeScript is optional, the boilerplate provided will accept TS or JS files
- We have provided all the basic tooling to ensure that you can use of common preprocessors or postprocessors

_We have outlined that your solution should not depend on any frameworks but this does not mean you cannot add and use libraries that will help you, we may discuss in a later interview on the decisions for use._

## What's included?

- A design - you can use figma to look at the design files.
  - Create an account. https://www.figma.com/
  - Import `__files__/design.fig` (default state)
  - Import `__files__/design-interactive.fig` (Interacted state)
- A webpack dev server that supports:
  - `.(css|postcss)` files - see for included base plugins `.postcssrc.js`
  - `.(less)` files
  - `.(sass|scss)` files
  - `.(stylus|styl)` files
  - `.(js|jsx)` files
  - `.(ts|tsx)` files
- Root aliasing `@/*` will map to `src/*`
- Base css variables `src/styles/vars.css`
- Jest is the provided library for unit tests.
  - We have included all the necessary packages and setup

By default we have have included `main.ts` if you wish to defer to JavaScript simply rename the file to `main.js`. If you want to use a different css preprocessor then change the extensions to the language.

## What's not included

We have given you the basics in order to run a simple application with your favourite tooling. If you wish to extend such as adding a linter, eg. eslint/stylelint, you may do so.

## How to run?

- Open up the Dev Server on `https://localhost:8080` with `yarn start`
- To retrieve the survey data make a request to `http://localhost:8080/api/survey`
- To retrieve the filter definition data make a request to `http://localhost:8080/api/filter-definition`
- To retrieve the logo make a request to `http://localhost:8080/assets/logo.svg`
- Run unit tests `yarn test`
- Run type checking `yarn typecheck`

## Notes

[Put any additional notes here that you would like us to know about your solution.]
