import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEventV2):Promise<APIGatewayProxyResultV2> => {
    console.log(event);

    return {
        statusCode: 200,
        // let's just return the whole event
        body: JSON.stringify(event),
    };
};