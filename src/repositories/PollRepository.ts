import { ErrorOr } from "../entities/ErrorOr";
import { PollCreateDTO, Poll } from "../entities/Poll";
import { StableBTreeMap, bool, ic } from "azle";
import { v4 as uuidv4 } from 'uuid';
import { getCurrentDate } from "../helpers/CurrentDate";

export class PollRepository {
    private pollStorage: any;

    constructor() {
        this.pollStorage = StableBTreeMap<string, Poll>(0);
    }

    public findAll(): Poll[] {
        return this.pollStorage.values();
    }

    public findById(id: string): ErrorOr<Poll> {
        const pollOpt = this.pollStorage.get(id);
        if ("None" in pollOpt) {
            return ErrorOr.error(`poll with id=${id} not found`);
        }

        return ErrorOr.ok(pollOpt.Some);
    }

    public create(data: PollCreateDTO): ErrorOr<Poll> {

        const { creatorName, question, startDate, endDate } = data;

        const poll: Poll = {
            id: uuidv4(),
            creatorAddress: ic.caller().toString(),
            creatorName,
            question,
            startDate,
            endDate,
            createdAt: getCurrentDate(),
            updatedAt: null
        };

        const validationError = this.validatePollInput(poll);

        if (validationError) {
            return ErrorOr.error(validationError);
        }

        this.pollStorage.insert(poll.id, poll);

        return ErrorOr.ok(poll);
    }

    public remove(id: string): ErrorOr<Poll> {
        const pollOpt = this.pollStorage.get(id);
        if ("None" in pollOpt) {
            return ErrorOr.error(`poll with id=${id} not found`);
        }

        const poll = pollOpt.Some;

        if (!this.isAuthorized(poll)) {
            return ErrorOr.error(`you are not authorized to delete poll with id=${id}`);
        }

        this.pollStorage.remove(id);
        return ErrorOr.ok(poll);
    }

    public update(id: string, data: PollCreateDTO): ErrorOr<Poll> {
        const result = this.validateUpdate(id);

        if (result.isError()) {
            return ErrorOr.error(result.getError());
        }

        const poll = result.getValue();
        const { creatorName, question, startDate, endDate } = data;
        const updatedPoll: Poll = {
            ...poll,
            creatorName: creatorName || poll.creatorName,
            question: question || poll.question,
            startDate: startDate || poll.startDate,
            endDate: endDate || poll.endDate,
            updatedAt: getCurrentDate()
        };

        this.pollStorage.insert(poll.id, updatedPoll);

        return ErrorOr.ok(updatedPoll);
    }

    private isAuthorized(poll: Poll): bool {
        return ic.caller().toString() === poll.creatorAddress;
    };

    private validatePollInput(poll: any): string | null {
        const requiredFields = ['creatorName', 'question', 'startDate', 'endDate'];

        for (const field of requiredFields) {
            if (!poll[field] || typeof poll[field] !== 'string' || poll[field].trim() === '') {
                return `${field} is required and must be a non-empty string.`;
            }
        }

        return null;
    }

    private validateUpdate(id: string): ErrorOr<Poll> {
        const pollOpt = this.pollStorage.get(id);
        if ("None" in pollOpt) {
            return ErrorOr.error(`couldn't update a poll with id=${id}. poll not found`);
        }

        const poll = pollOpt.Some;
        if (!this.isAuthorized(poll)) {
            return ErrorOr.error(`you are not authorized to update the poll with id=${id}`)
        }

        return ErrorOr.ok(poll);
    }
}