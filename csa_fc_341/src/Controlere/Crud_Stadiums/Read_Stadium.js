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


function Read_Stadiums(){

  const docRef = doc(db, "stadion", "id");

deleteDoc(docRef)
.then(() => {
    //console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
  function update(x){
    
    localStorage.setItem('stadium_id',x)
  }
  function onDelete(id) {
    deleteDoc(doc(db, "stadion", id));
    window.location.reload();
}

  function add_stadium(){
    
    window.open('http://localhost:3000/add_stadium','_parent','Add a stadium',param);
    
  }
  const [stadioane, setStadioane] = useState([]);
  
  const fetchStadioane = async()=>{
    let response=collection(db, 'stadion');
    let data =await getDocs(response).then((querySnapshot) => {

      querySnapshot.forEach(element => {
        //console.log(element.id);
          //setStadioane(arr => [...arr, "id: '"+element.id+"'"])
          var date = element.data();
          date.id = element.id;
          

          //console.log(date);
          setStadioane(arr => [...arr , date]);  
      });
  });
  }

    useEffect(()=>{
      fetchStadioane();

    },[])
    
    const { items, requestSort, sortConfig } = useSortableData(stadioane);
    const getClassNamesFor = (denumire) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === denumire ? sortConfig.direction : undefined;
        };

//console.log(stadioane)
    return(
      <body>
        <div>
          <Button type="button" className="bt4" onClick={()=>add_stadium()}>
              Add a stadium
          </Button>

        <Table singleLine className='tabel'>
        <Table.Header className='tt1'>
            <Table.Row>
            
            
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('denumire')}
      className={getClassNamesFor('denumire')}
    >Name</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('capacitate')}
      className={getClassNamesFor('capacitate')}
    >Capacity</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('tip_gazon')}
      className={getClassNamesFor('tip_gazon')}
    >Surface</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('adresa')}
      className={getClassNamesFor('adresa')}
    >Address</button></Table.HeaderCell>
    <Table.HeaderCell className='titlu'></Table.HeaderCell> 
    <Table.HeaderCell className='titlu'></Table.HeaderCell>              
                

            </Table.Row>
        </Table.Header>

        <Table.Body>
        
        {items.map((data) =>  {
return (
<Table.Row key = {data.denumire}>

<Table.Cell >{data.denumire}</Table.Cell>
          <Table.Cell >{data.capacitate}</Table.Cell>
          <Table.Cell >{data.tip_gazon}</Table.Cell>
          <Table.Cell >{data.adresa}</Table.Cell>
          <Table.Cell>
        <Button onClick={() =>onDelete(data.id)}>Delete</Button>
        </Table.Cell> 
        <Link to='/update_stadium'>
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

export default Read_Stadiums;
