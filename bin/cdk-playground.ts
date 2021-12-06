#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkPlaygroundStack } from "../lib/cdk-playground-stack";

const app = new cdk.App();

// Env
const ENV = process.env.ENV || "dev";
const SERVICE = process.env.SERVICE || "sample";

new CdkPlaygroundStack(app, "CdkPlaygroundStack", {
  // Setting up credentials
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
