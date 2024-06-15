export class Vote {
    id: string;
    voterAddress: string;
    choice: string;
    pollId: string;
    createdAt: Date;
    updatedAt: Date | null
}