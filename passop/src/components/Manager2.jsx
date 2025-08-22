import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
// step165: go on uuid documentation , install the package in terminal and import it as done below -
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const eyeRef = useRef()
    const passRef = useRef()
    const [form, setform] = useState({site: "", username: "", password: ""})
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if(passwords){
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])
    
    const showPassword = () => {
        if(eyeRef.current.src.includes("/icons/eyecross.png")){
            eyeRef.current.src = "/icons/eye.png"
            passRef.current.type = "password"
        }
        else{
            eyeRef.current.src = "/icons/eyecross.png"
            passRef.current.type = "text"
        }
    }

    const savePassword = () => {

        // step185: we now make sure not to make empty input tags to be added in the table on clicking save , by writing the code below -

        // step186: our input tags were controlled components , with the value equal to form.site , form.username and all ; also : the onChange function there was updating the form.site , form.username ... etc values too there : so as we type we set {site : "abc..." , username : "" , password : ""} : so if we dont type anything in input tag : it means the form has "" in their respective fields : so that only checked below if its empty using "!" symbol.
        if (!form.site || !form.username || !form.password) {

            // step187: then we show an error popup saying that fill all the fields.
            toast.error("Please fill all fields!");

            // step188: make the function exit before only and not proceeds further , till user enters all the fields and press "save" to run this function again there.
            return;
        }
 

        // step178: lets show the Toast on saving password too.
        toast.success('Password Saved', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
        });

        // step166: so now whenever the save button clicked ; we are creating a new object by copying the current data of it using the spread operator "..." and then appending a unique id to it too.
        const newEntry = { ...form, id: uuidv4() };

        // step167: Now we use the "..." operator again to create a new passwordArray with current data in it & appending the new object created above in it at the end.
        const updatedArray = [...passwordArray, newEntry];

        // step168: then we update the passwordArray using the setPassowrdArray function
        setpasswordArray(updatedArray);

        // step169: then we set that password array back into localStorage under the key "passwords" and converted to string too as by rule : localStorage only stores and returns strings
        localStorage.setItem("passwords", JSON.stringify(updatedArray));

        // step170: we log on the console : the updated Array too everytime to see in the console the data in the passwordArray
        console.log(updatedArray);

        // step171: we run in the console there : localStorage.clear() to clear the localStorage first and then start seeing the new data with the unique id in each object too.

        // step184: after the password gets set , we set the input tag back to normal empty using setform as setform updates the "form" state and since our input tags had their value set as form.site , form.username and all; so the input tag's value becomes "" empty too i.e. they become empty after we click save now.
        setform({ site: "", username: "", password: "" });
    }

    const handleChange = (e) => {
        setform({...form, [e.target.name]: e.target.value})
    }

    const copyText = (text) => {
        toast.info('Copied to Clipboard', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const editPassword = (id) => {
        console.log("Editting password of id" + id)

        // step179: we use filter function to return an array that has all passwords with id equal to the one passed in it as argument.

        // step180: we had set in the input tags that : it had value = {form.site} and so on ; so when edit clicked ; it triggers the onChange function , which loads the input tags with the given values : and now we want to set the input tags with the values of the row , whose "edit" button is clicked : so we pass in setform the object with which we want to populate the input tags ; so we pass the object of that id , which id was passed in the function i.e. the id of the row whose edit button was clicked ; so : thats why we have put [0] as passwordArray returns an array of objects , but we know that "form" has object , so access and pass the object as the value of "form" by accessing the object of the passed id using [0] to access it below.
        setform(passwordArray.filter((item) => item.id === id)[0])

        // step181: then we delete that id too using the code we used in "deletePassword" function ; so that when the data we want to edit gets loaded in the input tag , then it appears deleted from the list of passwords too : and then later when we will click on the save button again , then the savePassword function will run and save it back in that table and display it there again with the updated values now there.
        const updatedArray = passwordArray.filter((item) => item.id !== id)
        setpasswordArray(updatedArray);

        // NOTE : WE DIDN'T DO ANYTHING HERE TO LOCAL-STORAGE IN EDIT , TILL THE USER CLICKS ON SAVE AND SAVEPASSWORD FUNCTION RUNS : AS USER MAY CLICK ON EDIT BUTTON AND THEN CLOSE THE BROWSER ; SO WE DON'T DO ANYHTING TO LOCAL STORAGE TILL USER CLICKS SAVE HERE AFTER CLICKING ON THE EDIT BUTTON : LOCAL STORAGE UPDATES WITH THE NEW VALUE IN SAVEPASSWORD FUNCTION , ONCE THE USER CLICKS SAVE AND THAT SAVEPASSWORD FUNCTION RUNS THERE.
    }

    const deletePassword = (id) => {
        console.log("Deleting password of id" + id)
        // step174: we now generate a new array by using filter function , which returns a new array with the items in it that satisfy the condition mentioned in it ; so it will return an array with all the elements except the element that we have to delete : thus the element of the "id" got removed and saved without it in the updatedArray below.

        // step182: lets add a confirm too before deleting a password below , by using the inbuilt confirm function that returns "true" when OK clicked , else "false" when CANCEL clicked.
        let c = confirm("Are you sure to delete this password ?")
        
        // step183: so it now runs and deletes only when OK clicked else not.
        if(c){

        const updatedArray = passwordArray.filter((item) => item.id !== id)

        // step175: we now update the passwordArray with the update Array
        setpasswordArray(updatedArray);

        // step176: now we update the localStorage too by updating the item under key "passwords" to the new array that we update above.

        // step177: we passed the updatedArray and not the passwordArray as since the function has not yet completed ; it has not updated the passwordArray yet as React has not re-rendered yet as the function has not completed yet ; so we pass the updatedArray itself here in localStorage ; so that : the updated array gets set there even when we refresh it remains there & from next time now , React would have been re-rendered and the passwordArray now will be shown updated as it was updated by setPasswordArray function above.
        localStorage.setItem("passwords" , JSON.stringify(updatedArray))
        }
    }

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />

    <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

    <div className='mycontainer'>
        <h1 className="font-bold text-4xl text-center">
                <span className="text-green-700">&lt;/</span>
                <span>Pass</span>
                <span className="text-green-700">OP</span>
                <span className="text-green-700">/&gt;</span>
        </h1>
        <p className='text-center text-green-900 text-lg'>Your own Password Manager</p>

        <div className='text-black flex flex-col p-4 gap-8 items-center'>
            
            {/* step189: Found 3 elements with non-unique id #: this error was coming in the console : as we had kept id="" empty ; so lets give it some id below in all the 3 input tags below to remove that error from the console then here below. */}
            <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="text" name="site" id="site" />

            <div className='flex w-full justify-between gap-8'>
                <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="text" name="username" id="username" />

                <div className="relative">
                    <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="password" name="password" id="password" />
                    <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                        <img ref={eyeRef} className='p-1' width={26} src="/icons/eye.png" alt="" />
                    </span>
                </div>
            </div>
                
                <button onClick={savePassword} className='bg-green-600 hover:bg-green-500 rounded-full flex justify-center items-center px-8 py-2 w-fit gap-2 border-2 border-green-900'>
                    <lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover">
                    </lord-icon>
                    Save
                </button>
        </div>
        <div className="passwords">
            <h2 className='text-2xl font-bold py-4'>Your Saved Passwords</h2>
            {passwordArray.length === 0 && <div>No passwords to display here</div>}
            {passwordArray.length != 0 &&
            <table className="table-auto width w-full overflow-hidden rounded-md">
                <thead className='bg-green-800 text-white'>
                    <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-green-100'>
                    {passwordArray.map((item, index)=>{
                        return <tr key = {index}>
                            <td className='py-2 border border-white text-center'><a href={item.site} target="_blank"></a>
                                <div className="flex justify-center items-center">
                                    <span>{item.site}</span>
                                    <div className='size-7 cursor-pointer' onClick = {() => copyText(item.site)}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xuoapdes.json"
                                            trigger="hover"
                                            style={{"width":"20px" , "height":"25px" , "paddingTop":"3px" , "paddingLeft" : "3px"}}>
                                        </lord-icon>
                                    </div>
                                </div>
                            </td>
                            <td className='py-2 border border-white text-center '>
                                <div className="flex justify-center items-center">
                                    <span>{item.username}</span>
                                    <div className='size-7 cursor-pointer' onClick = {() => copyText(item.username)}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xuoapdes.json"
                                            trigger="hover"
                                            style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                        >
                                        </lord-icon>
                                    </div>
                                </div>
                            </td>
                            <td className='py-2 border border-white text-center'>
                                <div className="flex justify-center items-center">
                                    <span>{item.password}</span>
                                    <div className='size-7 cursor-pointer' onClick = {() => copyText(item.password)}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xuoapdes.json"
                                            trigger="hover"
                                            style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                        >
                                        </lord-icon>
                                    </div>
                                </div>
                            </td>
                            <td className='py-2 border border-white text-center'>

                                {/* step172: we now define it to run a function when onClick done on the edit icon below : and we have to make it arrow function as then it runs on clicking the button only and not when the page renders , so dont do it onClick{editPassword} but do onClick{ <arrow_function> .}  */}

                                <span className='cursor-pointer mx-1' onClick={() => {editPassword(item.id)}}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/qawxkplz.json"
                                        trigger="hover"
                                        style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                    >
                                    </lord-icon>
                                </span>

                                {/* step173: similarly , we now define it to run a function when onClick done on the delete icon below. */}
                                <span className='cursor-pointer mx-1' onClick={() => {deletePassword(item.id)}}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyfswyxf.json"
                                        trigger="hover"
                                        style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                    >
                                    </lord-icon>
                                </span>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            }
        </div>
    </div>
    </>
  )
}

export default Manager
