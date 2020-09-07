const config = require("config");
const Joi = require("joi");
const logger = require("./logger");

const express = require("express");
const app = express();

const client = require("prom-client");
const promMid = require("express-prometheus-middleware");

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  })
);

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;

// var Prometheus = require("./utils/prometheus");
// app.use(Prometheus.requestCounters);
// app.use(Prometheus.responseCounters);
// Prometheus.injectMetricsRoute(app);
// Prometheus.startCollection();
