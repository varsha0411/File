import axios from "axios";
import React, {useEffect,useState} from "react";
import DataTable from "react-data-table-component";

const Table = () => {
  const [search,setSearch]= useState("");
  const [names,setNames]=useState([]);
  const [filterednames,setFilterednames]=useState([]);
  const getNames = async()=> {
    try{
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    setNames(response.data);
    setFilterednames(response.data);   
    
    } catch(error){
      console.log(error);
    }
  };
  const columns =[
    {
      name:"id",
      selector:(row)=>row.id,
      sortable:true,
    },
    {
      name:"First Name",
      selector:(row)=>row.name,
    },
    {
      name:"Last Name",
      selector : (row)=>row.username,
    },
    {
      name:"Action",
      cell:(row)=>(
        <button
        classname ="btn btn-primary"
        onClick={()=> alert(row.name)}> View Details</button>
      ),

    },
  ];
  useEffect(()=>{
    getNames();
  },[]);
  useEffect(()=>{
    const result = names.filter(name => {
      return name.Firstname.toLowercase().match(search.toLowerCase);
    });
  setFilterednames(result);
  },[search]
  );
  return(
    <DataTable
    title="Details"
    columns={columns}
    data={filterednames}
    highlightOnHover
    subHeader
    subHeaderComponent={
      <input 
      type="text"
      placeholder="search bar"
      classname="w-25 form-control"
      value={search}
      onChange={(e)=> 
        {
          setSearch(e.target.value)
          console.log(e.target.value)
        }}
      />
    }
    />
  );

};
export default Table;