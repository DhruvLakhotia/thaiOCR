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
		// window.alert("ertyu"+e);
		// button.setAttribute('disabled', '');
		e.preventDefault();
		try {
	
			const formData = new FormData();
			formData.append("uploadedImage", image.raw);
		
		const response=	await fetch("http://localhost:8081/api/create_user", {
			  method: "POST",
			  headers: {
				// 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
			  },
			  body: formData
			});
			let json= await response.json();
		console.log(json);
		setJsonData(json);
		//  setResult({
		// 	identification_number:json.identification_number, first_name:json.first_name, lastName:json.lastName, dob:json.dob,
		// 	 issueDate:json.issueDate, expiryDate:json.expiryDate, status:json.status,
		// });
		// console.log("result ",result)
		  
		  

	}
	catch(err)
	{
			
	}
}

  return (
    <>
	<Navbar/>
     
	{/* <section id="content">
		
		
		
		<main>
			
			  <div>

				<div >
					<div>
						<form onSubmit={onsubmit} >
							<input type="file"  name="uploadedimage" onChange={handleOnClick} aria-describedby="inputGroupFileAddon03" aria-label="Upload" accept=".bmp, .jpg, .png, .pbm, .webp"/>
						
					
							<button type="submit"  >
								Recognize text
							</button>
					</form>
					<div >
						<div >
							<img   src={image.preview}  alt="Image"/>
								<p className='result_text'>Result</p>
							<div className='resultshow'>
							{jsonData==null?"No Data": (
        <pre>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
							</div>
						</div>
						
						
					
</div>
					
				</div>
		
			</div>
</div>

			
		</main>
		
	</section> */}
	
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
                Recognize text
              </button>
            </form>
            <div className="result-container">
              <img src={image.preview} alt="Image" className="uploaded-image" />
              <p className="result-text">Result</p>
              <div className="result-show">
                {jsonData == null ? 'No Data' : <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
	

    </>
  )
}