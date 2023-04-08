import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc, SubnetType } from "aws-cdk-lib/aws-ec2";
import {
  ContainerImage,
  FargateTaskDefinition,
  LogDriver,
  TaskDefinition,
  Protocol,
} from "aws-cdk-lib/aws-ecs";
import { LogGroup } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

export class MainStack extends Stack {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "Vpc", {
      cidr: "10.0.0.0/16",
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          name: "Public",
          cidrMask: 24,
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: "Private",
          cidrMask: 24,
          subnetType: SubnetType.PRIVATE_WITH_NAT,
        },
        {
          name: "Isolated",
          cidrMask: 24,
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Export
    this.vpc = vpc;
  }
}
