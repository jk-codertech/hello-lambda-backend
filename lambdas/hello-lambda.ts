import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({
    serviceName: 'hello-lambda-handler',
});

// Handler fails as it increases the default timeout of 3 seconds

// export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
//     await new Promise(resolve => setTimeout(resolve, 6000)); // Simulate a delay of 6 seconds
//     return {
//         statusCode: 200,
//         body: JSON.stringify(event),
//     };
// };

// Handler fails as it raises an exception


export const handler = async (event: APIGatewayProxyEventV2):Promise<APIGatewayProxyResultV2> => {
    logger.info('Got event', JSON.stringify(event));
    try {
        if (event)
        {
            throw new  Error("Event Error");
        }
        return {
            statusCode: 200,
            // let's just return the whole event
            body: JSON.stringify(event),
        };
    }
    catch (error) {
        logger.error(`Error : ${JSON.stringify(error)}`);
        throw new  Error("re raising the exception");
    }



};


// Handler fails as it run out of memory
/* TO DO */