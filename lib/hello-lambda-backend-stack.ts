import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FunctionUrlAuthType,Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction,OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import {CfnOutput} from "aws-cdk-lib";


export class HelloLambdaBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFn = new NodejsFunction(this, "hello-lambda", {
      functionName: "hello-lambda",
      description: "A simple hello lambda function",
      runtime: Runtime.NODEJS_18_X,

      entry: "lambdas/hello-lambda.ts",
      // additional config for esbuild
      bundling: {
        // we want to use ESM instead of CJS
        format: OutputFormat.ESM
      }
    });
    const fnurl = lambdaFn.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE
    });

    new CfnOutput(this, "hello-lambda-url", {
      value: fnurl.url
    });
    new CfnOutput(this, "hello-lambda-arn", {
      value: lambdaFn.functionName
    });
  }
}
