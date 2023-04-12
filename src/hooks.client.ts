import type { Evaluation } from "./routes/start/types";

export const useAdjectiveEvaluation = (myself: string, evaluations: Evaluation[]) => {

    const myAdjectives: string[] = evaluations.find(
		(evaluation: Evaluation) => evaluation.participant.id == myself
	)?.evaluation[myself] || [];

    const othersEvaluation = evaluations.filter((result) => {
        return result.participant.id != myself
    })
    
	const othersAdjectives = othersEvaluation.map(result => {
       return result.evaluation[myself]
    }).flat();

    const recognizedByOthersAndMe = myAdjectives.filter((adjective) => {
        return othersAdjectives.indexOf(adjective) >= 0
    });

    const recognizedByMeOnly = myAdjectives.filter((adjective) => {
        return othersAdjectives.indexOf(adjective) == -1
    });
    
    const recognizedByOthersOnly = othersAdjectives.filter((adjective) => {
        return myAdjectives.indexOf(adjective) == -1
    });

    return {
        recognizedByOthersAndMe,
        recognizedByMeOnly,
        recognizedByOthersOnly
    }
}