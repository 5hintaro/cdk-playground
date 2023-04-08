#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MainStack } from "../lib/main-stack";
import { FargateStack } from "../lib/fargate-stack";

const app = new cdk.App();

// Env
const ENV = process.env.ENV || "dev";
const SERVICE = process.env.SERVICE || "sample";

const mainStack = new MainStack(app, "MainStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new FargateStack(app, "FargateStack", {
  vpc: mainStack.vpc,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
