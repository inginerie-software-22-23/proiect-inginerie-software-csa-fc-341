import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { Table,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import "../Stil.css";
import {app} from '../../DatabaseConnection';
import { doc, deleteDoc } from "firebase/firestore";
import React,{useState,useEffect} from 'react';
const db = getFirestore(app);
let param ="width=500,height=500";
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
    //console.log(sortedItems)
    return { items: sortedItems, requestSort, sortConfig };
  };


function Read_Staffs(){

  const docRef = doc(db, "staff", "id");

deleteDoc(docRef)
.then(() => {
    //console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
  function update(x){
    
    localStorage.setItem('staff_id',x)
  }
  function onDelete(id) {
    deleteDoc(doc(db, "staff", id));
    window.location.reload();
}

  function add_staff(){
    
    window.open('http://localhost:3000/add_staff','_parent','Add a staff member',param);
    
  }
  const [staffs, setStaffs] = useState([]);
  
  const fetchStaffs = async()=>{
    let response=collection(db, 'staff');
    let data =await getDocs(response).then((querySnapshot) => {

      querySnapshot.forEach(element => {
        //console.log(element.id);
          //setStadioane(arr => [...arr, "id: '"+element.id+"'"])
          var date = element.data();
          date.id = element.id;
          

          //console.log(date);
          setStaffs(arr => [...arr , date]);  
      });
  });
  }

    useEffect(()=>{
      fetchStaffs();

    },[])
    
    const { items, requestSort, sortConfig } = useSortableData(staffs);
    const getClassNamesFor = (nume) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === nume ? sortConfig.direction : undefined;
        };

//console.log(stadioane)
    return(
      <body>
        <div>
          <Button type="button" className="bt4" onClick={()=>add_staff()}>
              Add a staff member
          </Button>

        <Table singleLine className='tabel'>
        <Table.Header className='tt1'>
            <Table.Row>
            
            
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('nume')}
      className={getClassNamesFor('nume')}
    >Nume</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('prenume')}
      className={getClassNamesFor('prenume')}
    >Prenume</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('data_nastere')}
      className={getClassNamesFor('data+nastere')}
    >Data nastere</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('rol')}
      className={getClassNamesFor('rol')}
    >Rol</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('email')}
      className={getClassNamesFor('email')}
    >Email</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('telefon')}
      className={getClassNamesFor('telefon')}
    >Telefon</button></Table.HeaderCell>
    <Table.HeaderCell className='titlu'></Table.HeaderCell> 
    <Table.HeaderCell className='titlu'></Table.HeaderCell>              
                

            </Table.Row>
        </Table.Header>

        <Table.Body>
        
        {items.map((data) =>  {
return (
<Table.Row key = {data.nume}>

<Table.Cell >{data.nume}</Table.Cell>
          <Table.Cell >{data.prenume}</Table.Cell>
          <Table.Cell >{data.data_nastere}</Table.Cell>
          <Table.Cell >{data.rol}</Table.Cell>
          <Table.Cell >{data.email}</Table.Cell>
          <Table.Cell >{data.telefon}</Table.Cell>
          <Table.Cell>
        <Button onClick={() =>onDelete(data.id)}>Delete</Button>
        </Table.Cell> 
        <Link to='/update_staff'>
          <Table.Cell> 
        <Button onClick={() =>update(data.id)}>Update</Button>
        </Table.Cell>
        </Link>
      

</Table.Row>
)})}
        </Table.Body>
    </Table>
    </div>
    </body>
    );
}

export default Read_Staffs;
