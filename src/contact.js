// import React, { useState, useRef } from "react";

// export default function Contact() {
//     const [formData, setFormData] = useState({});
//     // console.log("FORMDATA", formData);
//     const inputName = useRef();
//     const inputEmail = useRef();
//     const inputSubject = useRef();
//     const inputMessage = useRef();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         // console.log("NAME", name, "VALUE", value);
//         setFormData({ ...formData, [name]: value });
//     };

//     const submitForm = (e) => {
//         e.preventDefault();
//         console.log("FULL FORM DATA", formData);
//         const inputs = [inputName, inputEmail, inputSubject, inputMessage];
//         inputs.map((sub) => {
//             return (sub.current.value = "");
//         });
//     };

//     return (
//         <React.Fragment>
//             <div className="contact-container">
//                 <div className="contact-info">
//                     <h1>Have any thoughts?</h1>
//                     <p>
//                         Please contact us for any inquiries, suggestions or
//                         simply just to say hi :-)
//                     </p>
//                 </div>
//                 <div className="form-div">
//                     <form>
//                         <h2>Contact us</h2>
//                         <label>Name</label>
//                         <input
//                             ref={inputName}
//                             onChange={handleChange}
//                             type="text"
//                             name="name"
//                             placeholder="Your Name"
//                             required
//                         ></input>
//                         <label>Email</label>
//                         <input
//                             ref={inputEmail}
//                             onChange={handleChange}
//                             type="email"
//                             name="email"
//                             placeholder="Your email"
//                             required
//                         ></input>
//                         <label>Subject</label>
//                         <input
//                             ref={inputSubject}
//                             onChange={handleChange}
//                             type="text"
//                             name="subject"
//                             placeholder="Subject"
//                             required
//                         ></input>
//                         <label>Message</label>
//                         <textarea
//                             ref={inputMessage}
//                             name="message"
//                             onChange={handleChange}
//                             rows="5"
//                             cols="40"
//                             placeholder="write something"
//                         ></textarea>
//                         <button onClick={submitForm} type="submit">
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }
