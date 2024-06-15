import { StableBTreeMap, ic } from "azle";
import { Vote } from "../entities/Vote";
import { ErrorOr } from "../entities/ErrorOr";
import { v4 as uuidv4 } from "uuid";
import { getCurrentDate } from "../helpers/CurrentDate";

export class VoteRepository {
    private voteStorage: any;

    constructor() {
        this.voteStorage = StableBTreeMap<string, Vote>(1);
    }

    public vote(pollId: string, choice: string): ErrorOr<Vote> {
        const vote: Vote = {
            id: uuidv4(),
            voterAddress: ic.caller().toString(),
            choice,
            pollId,
            createdAt: getCurrentDate(),
            updatedAt: null
        };

        this.voteStorage.insert(vote.id, vote);

        return ErrorOr.ok(vote);
    }

    public fromPoll(pollId: string): Vote[] {
        return [...this.voteStorage.values()].filter(vote => vote.pollId === pollId);
    }

}