export class Poll {
    public constructor(
        public id: string,
        public creatorAddress: string, 
        public creatorName: string,
        public question: string,
        public startDate: Date,
        public endDate: Date,
        public createdAt: Date,
        public updatedAt: Date | null
    ) { }
}

export class PollCreateDTO {
    public constructor(
        public creatorName: string,
        public question: string,
        public startDate: Date,
        public endDate: Date
    ) { }
}