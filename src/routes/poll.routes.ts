import { Router } from "express";
import { PollCreateDTO } from "../entities/Poll";
import { PollRepository } from "../repositories/PollRepository";
import { VoteRepository } from "../repositories/VoteRepository";

const app = Router();
const voteRepository = new VoteRepository();
const pollRepository = new PollRepository();

app.post("/polls/:id/vote", (req, res) => {
    const id = req.params.id;
    const { choice } = req.body;

    const result = voteRepository.vote(id, choice);

    if (result.isOk()) {
        res.json(result.getValue())
    } else {
        res.status(400).send(result.getError())
    }

});

app.post("/polls", (req, res) => {
    const { creatorName, question, startDate, endDate } = req.body;
    const data = new PollCreateDTO(creatorName, question, startDate, endDate);
    const result = pollRepository.create(data);

    if (result.isOk()) {
        res.json(result.getValue())
    } else {
        res.status(400).send(result.getError())
    }

});

app.get("/polls", (req, res) => {
    const polls = pollRepository.findAll();

    const pollsWithVotes = polls.map(poll => ({
        id: poll.id,
        creatorName: poll.creatorName,
        question: poll.question,
        startDate: poll.startDate,
        endDate: poll.endDate,
        votes: voteRepository.fromPoll(poll.id).map(vote => vote.choice)
    }));

    res.json(pollsWithVotes);
});

// Retrieve one poll based on the provided id
app.get("/polls/:id", (req, res) => {
    const pollId = req.params.id;
    const result = pollRepository.findById(pollId);

    if (result.isOk()) {
        const poll = {
            ...result.getValue(),
            votes: voteRepository.fromPoll(pollId).map(vote => vote.choice)
        }
        
        res.json(poll);
    } else {
        res.status(400).send(result.getError())
    }
});

//Update poll based on the id
app.put("/poll/:id", (req, res) => {
    const id = req.params.id;
    const { creatorName, question, startDate, endDate } = req.body;
    const data = new PollCreateDTO(creatorName, question, startDate, endDate);
    const result = pollRepository.update(id, data);

    if (result.isOk()) {
        const poll = result.getValue();
        res.json(poll);
    } else {
        res.status(400).send(result.getError());
    }
});

// Delete poll based on the id
app.delete("/polls/:id", (req, res) => {
    const id = req.params.id;
    const result = pollRepository.remove(id);

    if (result.isOk()) {
        res.json(result.getValue());
    } else {
        res.status(400).send(result.getError());
    }
});

export default app;