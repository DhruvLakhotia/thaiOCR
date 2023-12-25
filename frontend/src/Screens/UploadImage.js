import React from 'react'
import  { useContext, useEffect, useState } from 'react'
import Navbar from './../Components/Navbar';
import './home.css'
export default function Homepage() {
	// Set Image to ui and store in database
	const [image, setImage] = useState({ preview: "", raw: "" });

	const [jsonData, setJsonData] = useState(null);
	const [result,setResult]=useState({
		identification_number:'', first_name:'', lastName:'', dob:'', issueDate:'', expiryDate:'', image:'', status:'',
	});

	const handleOnClick=(e)=>
	{
		e.preventDefault();
		if (e.target.files.length) {
			setImage({
			  preview: URL.createObjectURL(e.target.files[0]),
			  raw: e.target.files[0]
			});
		  }
		  console.log("Image ",image.preview+"	"+image.raw);
	}
	const onSubmit=async(e)=>{
		
		e.preventDefault();
		try {
	
			const formData = new FormData();
			formData.append("uploadedImage", image.raw);
		
		const response=	await fetch("https://thaiocr-production-96be.up.railway.app/api/create_user", {
			  method: "POST",
			  headers: {
			  },
			  body: formData
			});
			let json= await response.json();
		console.log(json);
		setJsonData(json);
		
	}
	catch(err)
	{
			
	}
}

  return (
    <>
	<Navbar/>
     
	
	
	<section id="content" className="content-section">
      <main className="main-container">
        <div className="main-wrapper">
          <div className="form-container">
            <form onSubmit={onSubmit} className="upload-form">
              <input
                type="file"
                name="uploadedimage"
                onChange={handleOnClick}
                aria-describedby="inputGroupFileAddon03"
                aria-label="Upload"
                accept=".bmp, .jpg, .png, .pbm, .webp ,.jpeg"
              />
              <button type="submit" className="recognize-button">
                Analyze ID
              </button>
            </form>
            <div className="result-container" style={{display:'flex', padding:'10px'}}>
				<div style={{width:'400px', paddingTop:'75px '}}>

              	<img src={image.preview} alt="Please Submit Image" className="uploaded-image"  />
				</div>
              <div style={{margin:'0 25px'}}>

			  <p className="result-text">Result</p>
              <div className="result-show">
                {jsonData == null ? 'No Data' : <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
              </div>
			  </div>
            </div>
          </div>
        </div>
      </main>
    </section>
	

    </>
  )
}