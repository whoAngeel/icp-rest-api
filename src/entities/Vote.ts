export class Vote {
    id: string;
    voterAddress: string;
    voterName: string
    choice: string;
    pollId: string;
    createdAt: Date;
    updatedAt: Date | null
}