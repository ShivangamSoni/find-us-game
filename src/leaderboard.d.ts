declare namespace LeaderBoard {
    interface Data extends RawData {
        id: string;
        achievedOn: Date;
        completedIn: string;
    }

    interface RawData {
        name: string;
        achievedOn: import("firebase/firestore").Timestamp;
        completedIn: number;
    }
}
