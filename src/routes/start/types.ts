export type Participant = {
    id: string,
    name: string
}

export type AssignedAdjectivesMap = {
    [id: string]: string[]
}

export type Evaluation = {
    id: string,
    roomId: string,
    participant: Participant,
    evaluation: AssignedAdjectivesMap
}