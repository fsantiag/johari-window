import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';
import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';


const dynamoClient = new DynamoDBClient({
    region: "eu-central-1", credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
});



export const POST = (async ({ request, params }) => {
    const { evaluation, participant } = await request.json();

    const evaluationId = uuidv4()

    const Item = {
        id: { S: evaluationId },
        roomId: { S: params.id },
        participant: { S: JSON.stringify(participant) },
        evaluation: { S: JSON.stringify(evaluation) }
    };
    await dynamoClient.send(
        new PutItemCommand({
            TableName: 'evaluation',
            Item,
        })
    );

    return json({ id: evaluationId });
}) satisfies RequestHandler;


export const GET = (async ({ params }) => {
    const { Items } = await dynamoClient.send(
        new QueryCommand({
            TableName: 'evaluation',
            IndexName: 'roomId-index',
            KeyConditionExpression: '#roomId = :roomId',
            ExpressionAttributeNames: {
                '#roomId': 'roomId',
            },
            ExpressionAttributeValues: {
                ':roomId': {S: params.id},
            },

        })
    );

    console.log(Items)

    return json({
        id: params.id
    });
}) satisfies RequestHandler;