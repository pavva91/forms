# forms

## Problem
The main goal is to create 2 classes (tables):
- Form Definition
- Form Entry

These 2 entities are linked together in a 1:N relationship (one form definition has many entries).
The issue is that we don't know a priori the exact structure of the form definition, the only boundaries are that it will be an arbitrary list of (question, type). For the rest the user is free to define whatever form he wants.
For the sake of this demo I limited the scope of the types in input to:
- string
- integer (number)
- boolean
- date
- tuple

## Goal
How to handle the types that the user define? The type are not knownw upfront, so the goal is to check at runtime if the user input is correct and cast these values.

## Solution
Typescript give the unknown type to handle these situations.
So the interfaces that I created are:

```
export interface IFormDef {
    id: number;
    name: string;
    questions: string[];
    types: string[];
}
```
```
export interface IForm {
    id: number;
    values: unknown[];
    form_definition_id: number;
}
```

Probably for Form Definition a Map could be a more elegant solution.
I used these technologies:
- nodejs
- express.js
- Typescript
took from here: https://www.npmjs.com/package/express-generator-typescript

## TODO
- Regex on Dates and geo-coordinates(lat,lon)
- Unit test

https://credix.notion.site/Full-stack-technical-task-bc377eec0c234220ba0fcd33d28427f1
