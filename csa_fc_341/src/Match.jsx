import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { Button, Table } from 'semantic-ui-react'
import {app} from './DatabaseConnection';
import { getFirestore, getDoc, doc } from "firebase/firestore";


const db = getFirestore(app);

const Match = () => {
    const {id} = useParams();
    const [match, SetMatch] = useState({});
    const [stadion, SetStadion] = useState({});
    const [jucatori, setJucatori] = useState([]);


    const fetch = async() => {
        const docRef = doc(db, "meci", id);

        await getDoc(docRef)
        .then(async (response) => {
            let res = response.data();
            
            SetMatch(res);

            const id_stadion = res.id_stadion._key.path.segments[6];
            const stadionDocRef = doc(db, "stadion", id_stadion);
            
            await getDoc(stadionDocRef)
            .then(async (response2) => {
                let res2 = response2.data();

                // daca meciul e in deplasare, inverseaza scorul
                if (res2.denumire !== "Arena Nationala"){
                    let echipa_gazda = res.adversar;
                    res["echipa_gazda"] = echipa_gazda;
                    res["echipa_oaspete"] = "FCSB";
                    SetMatch(res);
                } else {
                    let echipa_oaspete = res.adversar;
                    res["echipa_gazda"] = "FCSB";
                    res["echipa_oaspete"] = echipa_oaspete;
                    SetMatch(res);
                }

                let oras = res2.adresa.split(" ")[res2.adresa.split(" ").length - 2];
                res2["oras"] = oras;
                SetStadion(res2);

                let ls_juc = [];

                await res.lista_jucatori.forEach(async(element) => {
                    let jucator = {};
                    jucator["id"] = element._key.path.segments[6];
                    const jucatorDocRef = doc(db, "jucator", jucator?.id);
            
                    await getDoc(jucatorDocRef)
                    .then(async(response3) => {
                        let res3 = response3.data();
                        jucator["date"] = res3;
                    })
                    .catch((e) => console.log(e));

                    ls_juc.push(jucator);

                    if(ls_juc.length === 11){
                        setJucatori(ls_juc);
                    }
                });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    };

    useEffect(() => {
        fetch();
    }, [SetMatch, SetStadion, setJucatori]);

    return (
        <div>
            <h1>Competitie: {match?.competitie}</h1>
            <h2>Data: {match?.data}</h2>
            <h2>{match?.echipa_gazda} {match?.scor} {match?.echipa_oaspete}</h2>
            
            <br />

            <h3>Echipa de start: </h3>
            <div>
                <Table singleLine className='tabel'>
                    <Table.Body>
                        {jucatori.map((data) =>  {
                            return (
                                <Table.Row key = {data.id}>
                                    <Table.Cell >{data.id}</Table.Cell>
                                    <Table.Cell >{data.date?.prenume} {data.date?.nume}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>

            <br />

            <footer>
                <h4>Arbitru: {match?.arbitru}</h4>
                <h4>Stadion: {stadion?.denumire}({stadion?.oras})</h4>
                <Link to="/tomeci">
                    <Button>Go back</Button>
                </Link>
            </footer>
        </div>
    );
}

export default Match;