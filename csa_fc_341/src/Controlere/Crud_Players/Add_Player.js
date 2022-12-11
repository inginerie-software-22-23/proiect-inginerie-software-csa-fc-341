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


function Read_Matches(){

  const docRef = doc(db, "meci", "id");

deleteDoc(docRef)
.then(() => {
    //console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
  function update(x){
    
    localStorage.setItem('match_id',x)
  }
  function onDelete(id) {
    deleteDoc(doc(db, "meci", id));
    window.location.reload();
}

  function add_match(){
    
    window.open('http://localhost:3000/add_match','_parent','Add a match',param);
    
  }
  const [meciuri, setMeciuri] = useState([]);
  
  const fetchMeciuri = async()=>{
    let response=collection(db, 'meci');
    let data =await getDocs(response).then((querySnapshot) => {

      querySnapshot.forEach(element => {

          var date = element.data();
          date.id = element.id;

          setMeciuri(arr => [...arr , date]);  
      });
  });
  }

    useEffect(()=>{
      fetchMeciuri();

    },[])
    
    const { items, requestSort, sortConfig } = useSortableData(meciuri);
    const getClassNamesFor = (adversar) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === adversar ? sortConfig.direction : undefined;
        };

    return(
      <body>
        <div>
          <Button type="button" className="bt4" onClick={()=>add_match()}>
              Adauga un nou meci
          </Button>

        <Table singleLine className='tabel'>
        <Table.Header className='tt1'>
            <Table.Row>
            
            
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('adversar')}
      className={getClassNamesFor('adversar')}
    >Adversar</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('arbitru')}
      className={getClassNamesFor('arbitru')}
    >Arbitru</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('competitie')}
      className={getClassNamesFor('competitie')}
    >Competitie</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('data')}
      className={getClassNamesFor('data')}
    >Data</button></Table.HeaderCell>
                <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('scor')}
      className={getClassNamesFor('scor')}
    >Scor</button></Table.HeaderCell>
                {/* <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('id_stadion')}
      className={getClassNamesFor('id_stadion')}
    >Id Stadion</button></Table.HeaderCell> */}
                {/* <Table.HeaderCell className='titlu'><button
      type="button"
      onClick={() => requestSort('lista_jucatori')}
      className={getClassNamesFor('lista_jucatori')}
    >Lista jucatori</button></Table.HeaderCell> */}
    <Table.HeaderCell className='titlu'></Table.HeaderCell> 
    <Table.HeaderCell className='titlu'></Table.HeaderCell>              
                

            </Table.Row>
        </Table.Header>

        <Table.Body>
        
        {items.map((data) =>  {
return (
<Table.Row key = {data.adversar}>

<Table.Cell >{data.adversar}</Table.Cell>
<Table.Cell >{data.arbitru}</Table.Cell>
<Table.Cell >{data.competitie}</Table.Cell>
<Table.Cell >{data.data}</Table.Cell>
<Table.Cell >{data.scor}</Table.Cell>
{/* <Table.Cell >{data.id_stadion}</Table.Cell> */}
{/* <Table.Cell >{data.lista_jucatori}</Table.Cell>  */}

 <Table.Cell>
        <Button onClick={() =>onDelete(data.id)}>Delete</Button>
</Table.Cell> 

 <Link to='/update_match'>
    <Table.Cell> 
        <Button onClick={() =>update(data.id)}>Update</Button>
    </Table.Cell>
</Link> 
      

</Table.Row>
)})

  }  </Table.Body>
    </Table>
    </div>
    </body>
    );
}

export default Read_Matches;