import React, {useState} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { getFirestore, collection, getDocs, query, where, waitForPendingWrites } from "firebase/firestore";
import { addDoc } from "firebase/firestore"; 
import {app} from '../../DatabaseConnection';
import {date_export} from './Read_Stadium';
import {CSVLink} from 'react-csv';
import { jsPDF } from "jspdf";
import "../Stil.css";
import {Export_To_PDF} from "./Export_PDF";


const sorted_date_export = [];


export function ExportExcel(){
    date_export.forEach(e=>{
        
        var aux = {
            Name: e["denumire"],
            Capacity: e["capacitate"],
            Surface: e["tip_gazon"],
            Address: e["adresa"] 
        }
        if(sorted_date_export.length !== date_export.length){
            sorted_date_export.push(aux);
            //console.log(sorted_date_export);
        }

/* 
e{
    denumire:
    capacitate:
    tip_gazon:
    adresa:
}
*/

        // if(!sorted_date_export.includes(e)){
        // sorted_date_export.push({
        //     Name: e["denumire"],
        //     Capacity: e["capacitate"],
        //     Surface: e["tip_gazon"],
        //     Address: e["adresa"]
        // });}
    //}
    })

    return(
        <>
            <CSVLink data = {sorted_date_export} filename="exported_stadiums" className="bt4">Export to Excel</CSVLink>
            <button className="bt4" onClick={()=>Export_To_PDF()}>Export to PDF</button>
        </>
    );


}

export let exp_sorted_date_export = sorted_date_export;
