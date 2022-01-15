import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

interface SubStackProps extends StackProps {
  vpc: Vpc;
}

export class SubStack extends Stack {
  constructor(scope: Construct, id: string, props: SubStackProps) {
    super(scope, id, props);

  }
}
