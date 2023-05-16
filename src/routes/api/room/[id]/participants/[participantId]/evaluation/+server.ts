import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';
import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import type { Participant } from '../../../../../../start/types';

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
        participant: { M: marshall(participant)},
        evaluation: { M: marshall(evaluation) }
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
    const { Item } = await dynamoClient.send(
        new GetItemCommand({
            TableName: 'room',
            Key: {
                id: {S: params.id}
            }
        })
    );
    const participants: [] = JSON.parse(Item?.participants.S ?? '[]').map((p: Participant) => p.id)

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


    const evaluations = Items?.map(item => {
        return unmarshall(item)
    })

    const finishedParticipants = evaluations?.map((e) => e.participant.id)

    const sessionFinished = participants.every((p) => finishedParticipants?.includes(p))

    return json({
        status: sessionFinished ? "completed": "inprogress",
        evaluations
    });
}) satisfies RequestHandler;