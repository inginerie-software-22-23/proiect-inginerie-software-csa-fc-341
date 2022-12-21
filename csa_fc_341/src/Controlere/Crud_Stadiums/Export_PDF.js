import React, {useState} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { getFirestore, collection, getDocs, query, where, waitForPendingWrites } from "firebase/firestore";
import { addDoc } from "firebase/firestore"; 
import {app} from '../../DatabaseConnection';
import {date_export} from './Read_Stadium';
import {CSVLink} from 'react-csv';
import { jsPDF } from "jspdf";
import "../Stil.css";
import { exp_sorted_date_export } from './Export_Excel';


var doc = new jsPDF('l', 'mm', [500, 210]);
doc.text("Name\t\t\t\t\t\t\tCapacity\t\tSurface\t\t\tAddress", 20, 10);


export function Export_To_PDF(){
    exp_sorted_date_export.forEach(function(e, i){
        if(20 + (i * 10) > 200){
            doc.addPage();
            doc.text("Name\t\t\t\t\t\t\tCapacity\t\tSurface\t\t\tAddress", 20, 10);
            i = 0;
        }
        doc.text(
            e.Name, 20, 20 + (i * 10));
        doc.text(
            e.Capacity.toString(), 125, 20 + (i * 10));
        doc.text(
            e.Surface, 170, 20 + (i * 10));
        doc.text(
            e.Address, 225, 20 + (i * 10));
        
    });
    
    doc.save('exported_stadiums.pdf');
}

