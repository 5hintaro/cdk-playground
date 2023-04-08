import { Stack, StackProps } from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { ApplicationProtocol } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";

interface FargateStackProps extends StackProps {
  vpc: Vpc;
}

export class FargateStack extends Stack {
  constructor(scope: Construct, id: string, props: FargateStackProps) {
    super(scope, id, props);

    const vpc = props.vpc;
    const taskSubnets = props.vpc.selectSubnets({
      subnetType: SubnetType.PUBLIC,
    });

    const loadBalancedFargateService =
      new ApplicationLoadBalancedFargateService(this, "Service", {
        vpc,
        taskSubnets,
        cpu: 512,
        memoryLimitMiB: 1024,
        desiredCount: 1,
        taskImageOptions: {
          image: ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
        },
        // ALB setting
        publicLoadBalancer: true,
        protocol: ApplicationProtocol.HTTPS,
        loadBalancerName: "alb",
      });
  }
}
