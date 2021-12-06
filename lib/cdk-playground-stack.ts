import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc, SubnetType } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class CdkPlaygroundStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Vpc(this, "vpc", {
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
  }
}
