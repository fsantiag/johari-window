import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';


const dynamoClient = new DynamoDBClient({
    region: "eu-central-1", credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
});

export const POST = (async ({ request }) => {
    const { users, maxAdjectives } = await request.json();

    const roomId = uuidv4()

    const Item = {
        id: { S: roomId },
        participants: { S: JSON.stringify(users) },
        maxAdjectives: { S: maxAdjectives }
    };
    await dynamoClient.send(
        new PutItemCommand({
            TableName: 'room',
            Item,
        })
    );

    return json({ id: roomId });
}) satisfies RequestHandler;