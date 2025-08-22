// made by CHATGPT to toggle  EDIT and DELETE buttons here.
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const eyeRef = useRef()
    const passRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    // 🆕 EDIT MODE STATE VARIABLES
    // These are NEW — They allow the same form to be used for both adding and editing passwords.
    // Without these, you'd need a separate UI for editing.
    const [isEditing, setIsEditing] = useState(false); // Tracks if we are in "edit" mode.
    const [editId, setEditId] = useState(null);        // Stores the ID of the password currently being edited.

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        if (eyeRef.current.src.includes("/icons/eyecross.png")) {
            eyeRef.current.src = "/icons/eye.png"
            passRef.current.type = "password"
        }
        else {
            eyeRef.current.src = "/icons/eyecross.png"
            passRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error("Please fill all fields!");
            return;
        }

        // 🆕 EDIT MODE LOGIC
        // If isEditing is true → we update an existing password instead of adding a new one.
        if (isEditing) {
            // Create a new array where only the edited password object is replaced
            const updatedArray = passwordArray.map(item =>
                item.id === editId ? { ...form, id: editId } : item
            );

            setpasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));

            toast.success('Password Updated', { position: "top-right", theme: "dark" });

            // Reset edit mode state so next save is treated as "Add"
            setIsEditing(false);
            setEditId(null);

        } else {
            // 🆕 GENERATE UNIQUE ID
            // When adding a new password, we now give it a UUID so each entry can be
            // uniquely identified for editing/deleting (instead of relying on index).
            const newEntry = { ...form, id: uuidv4() };

            const updatedArray = [...passwordArray, newEntry];
            setpasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));

            toast.success('Password Saved', { position: "top-right", theme: "dark" });
        }

        // Clear form after saving or updating
        setform({ site: "", username: "", password: "" });
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
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

    // 🆕 EDIT FUNCTION
    // Loads the selected password into the form for editing
    const editPassword = (id) => {
        console.log("Editting password of id " + id)

        // Find the password entry with matching ID
        const itemToEdit = passwordArray.find(item => item.id === id);

        if (itemToEdit) {
            setform(itemToEdit);   // Pre-fill the form with existing values
            setIsEditing(true);    // Switch to edit mode
            setEditId(id);         // Remember which ID we're editing

            // 🆕 UX DECISION:
            // Remove the old version from the table immediately, so user won't see duplicates
            // while editing. The new version will be added back when saved.
            const updatedArray = passwordArray.filter(item => item.id !== id);
            setpasswordArray(updatedArray);
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting password of id" + id)
        let c = confirm("Are you sure to delete this password ?")
        if (c) {
            const updatedArray = passwordArray.filter((item) => item.id !== id)
            setpasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray))
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

            {/* Background styling */}
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
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="text" name="site" id="" />

                    <div className='flex w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="text" name="username" id="" />

                        <div className="relative">
                            <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="password" name="password" id="" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={eyeRef} className='p-1' width={26} src="/icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    {/* 🆕 Dynamic Button Text
                        Changes label between "Add" and "Save" depending on isEditing */}
                    <button onClick={savePassword} className='bg-green-600 hover:bg-green-500 rounded-full flex justify-center items-center px-8 py-2 w-fit gap-2 border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        {isEditing ? "Save" : "Add"}
                    </button>
                </div>

                {/* Password list table */}
                <div className="passwords">
                    <h2 className='text-2xl font-bold py-4'>Your Saved Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to display here</div>}
                    {passwordArray.length !== 0 &&
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
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className="flex justify-center items-center">
                                                <span>{item.site}</span>
                                                <div className='size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xuoapdes.json"
                                                        trigger="hover"
                                                        style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className="flex justify-center items-center">
                                                <span>{item.username}</span>
                                                <div className='size-7 cursor-pointer' onClick={() => copyText(item.username)}>
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
                                                <div className='size-7 cursor-pointer' onClick={() => copyText(item.password)}>
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
                                            {/* 🆕 Edit Button */}
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/qawxkplz.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                >
                                                </lord-icon>
                                            </span>

                                            {/* Delete Button (was already present, just using id now instead of index) */}
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
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
