import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';


const dynamoClient = new DynamoDBClient({
    region: "eu-central-1", credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
});

export const GET = (async ({ params }) => {
    const { Item } = await dynamoClient.send(
        new GetItemCommand({
            TableName: 'room',
            Key: {
                id: {S: params.id}
            }
        })
    );

    return json({
        id: params.id,
        participants: JSON.parse(Item?.participants.S ?? '[]')
    });
}) satisfies RequestHandler;