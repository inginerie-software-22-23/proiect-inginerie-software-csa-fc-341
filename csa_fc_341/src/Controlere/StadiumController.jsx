import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../DatabaseConnection"
//import { Stadion } from "../Clase/Stadion"

const db = getFirestore(app);

const stadiumCollection = collection(db, "stadion");

export async function getStadioane() {
    const q = query(stadiumCollection, where("adresa", "!=", null));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) =>{
        console.log(doc.id, " => ", doc.get("adresa"))
    })
}