import { db } from "$lib/firebaseConfig/firebase";
import { setDoc } from "firebase/firestore";

export default ({ selectedEnvId, id, uid, actSub }) => {
    const docRef = doc(
        db,
        'card-envs',
        selectedEnvId,
        'cards',
        id,
        'activitySubmissions',
        uid
    );
    setDoc(docRef, actSub);
    // console.log('submit', actSub);
    curActSub = actSub;
}