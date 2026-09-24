# CognoDB Graph App

A simple full-stack graph database application built with Node.js, Express, and CognoDB.

## Live Demo

https://cognodb-graph-app-phi.vercel.app/

## What This Project Does

This application allows users to:

- Add people
- Create connections between people
- Find a person's connections

The data is stored in CognoDB as a graph.

For example:

Michael → KNOWS → David

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- CognoDB
- Neo4j JavaScript Driver
- Vercel
- GitHub

## How It Works

The frontend provides the user interface.

The Express backend receives requests from the frontend.

The backend sends Cypher queries to CognoDB.

CognoDB stores people as nodes and relationships as connections between those nodes.

Example:

```text
Michael ── KNOWS ──> David