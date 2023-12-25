import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import Navbar from './../Components/Navbar';
import './result.css'
export default function ResultPage() {
	// state for record
	const [detail,setDetail]=useState([]);

	// set image
	const[image,setImage]=useState();

	// state for search item (filter)
	const [searchItem, setSearchItem] = useState([])

	// set the initial state of filteredUsers to an empty array
	const [filteredUsers, setFilteredUsers] = useState([])

	// set the initial filter on first_name +lastName'

	const [filterdata,setFilterdata]=useState('Status');

	const handleSelectFilter=(e)=>{
		console.log("filteSelect",e.target.innerText)
		// const dropdown = document.querySelector('.dropdown-content');
		// dropdown.style.display = 'none';
		// dropdown.setAttribute('display','none')
		setFilterdata(e.target.innerText);
	}


	const handleInputChange = (e) => { 
		const searchTerm = e.target.value;
		setSearchItem(searchTerm)
		console.log("filterdata "+filterdata);
		// filter the items using the detail state
	// 	if(filterdata=='issue Date'){
	// 	const filteredItems = detail.filter((user) =>
	// 	(user[filterdata]).toLowerCase().includes(searchTerm.toLowerCase())
		
	//   );
	//   setFilteredUsers(filteredItems);
	// 	}

	// 	if(filterdata=='Expiry Date'){
	// 		const filteredItems = detail.filter((user) =>
	// 		(user.expiryDate).toLowerCase().includes(searchTerm.toLowerCase())
	// 	  );
	// 	  setFilteredUsers(filteredItems);
	// 		}

			// if(filterdata=='Status'){
			// 	// const filteredItems = detail.filter((user) =>
			// 	(user.status).toLowerCase().includes(searchTerm.toLowerCase())
			//   );
			//   setFilteredUsers(filteredItems);
				// }
				const filteredItems = detail.filter((user) => {
					const values = Object.values(user);
				  
					return values.some((value) =>
					  String(value).toLowerCase().includes(searchTerm.toLowerCase())
					);
				  });
				  
				  setFilteredUsers(filteredItems);
				  
	  
	  }
	// delete record

	const deleteItem=async(id)=>{
		// window.alert(id);
		try {
			
			const response=await fetch(`https://thaiocr-production-96be.up.railway.app/api/deleterecord/${id}`,{
			  method:"POST",
			  headers:{
				// 'content-Type':'application/json',
				// 'auth-token':localStorage.getItem('token')
			  },
			//   body:JSON.stringify({complain_status:currstatus})
			  
			});
			// let json= await response.json();
			fetchdata();
			// console.log(json);
		}
		catch (error) {
 
			console.log (error);
		  }
	}

	const fetchdata= async()=>{
		
	
		try {
	   
		  const response=await fetch("https://thaiocr-production-96be.up.railway.app/api/fetchrecord",{
			method:"GET",
			headers:{
			//   'content-Type':'application/json',
			//   'auth-token':localStorage.getItem('token')
			},
			
		  });
		  let json= await response.json();
		  setDetail(json);
		  setFilteredUsers(json)
		  console.log(detail);
		 
		  
		}
		catch (error) {
	   
		  console.log (error);
		}
	}

	useEffect(()=>{
   
		fetchdata();
	   
	  },[]);

  return (
	<div>
	<Navbar />
	<section id="content" className="content-section">
	  <main className="main">
		<div className="table-data">
		  <div className="order">
			<div className="head head_nav">
			  <h3>Records</h3>
			  <div className="form-input">
				<input
				  type="search"
				  placeholder="Type to search"
				  value={searchItem}
				  onChange={handleInputChange}
				/>
			  </div>
			  
			</div>
			{filteredUsers.length === 0 ? (
			  <p>No users found</p>
			) : (
			  <div className="tableContainer">
				<table>
				  <thead>
					<tr>
					  <th>S.No</th>
					  <th>User</th>
					  <th>Issue Date</th>
					  <th>Expiry Date</th>
					  <th>Status</th>
					  <th>Action</th>
					</tr>
				  </thead>
				  <tbody>
					{filteredUsers.map((data, index) => (
					  <tr key={index}>
						<td>{index + 1}</td>
						<td>
						  {/* <img src="https://www.sinosecu.com.cn/upload/20211018/KXa2NPVvXF278Wr6gTR.jpg" alt="User" /> */}
						  <p>{data.first_name + ' ' + data.lastName}</p>
						</td>
						<td>{data.issueDate}</td>
						<td>{data.expiryDate}</td>
						<td>
						  <span className={`status ${data.status.toLowerCase()}`}>{data.status}</span>
						</td>
						<td>
						  <button onClick={() => deleteItem(data._id)}>
							Delete
						  </button>
						</td>
					  </tr>
					))}
				  </tbody>
				</table>
			  </div>
			)}
		  </div>
		</div>
	  </main>

	</section>
  </div>
  )
}