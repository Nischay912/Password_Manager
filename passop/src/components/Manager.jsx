// step8: lets make this main component for our App here now.
import React, { useEffect, useRef , useState } from 'react'

// step154: we now use a React Toastify here : we go on : https://fkhadra.github.io/react-toastify/ > and follow the steps there : install in terminal first & then import statement copy and paste below.
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    // step54: now lets use the useRef hook to refer to the eye icon and target it , in order to change the icon when clicked on it.
    const eyeRef = useRef()

    // step138: create the "passRef" that we used in the password input tag in the last step.
    const passRef = useRef()

    // step61: lets create a useState that initially contains an object with : site , username and password : all initially empty.
    const [form, setform] = useState({site: "" , username: "" , password: ""})

    // step80: lets create a passwordArray as a state here which is initially an empty array , like made below -
    const [passwordArray, setpasswordArray] = useState([])

    // step79: lets create a useEffect below.
    useEffect(() => {
        // step82: now we use getItem function to access the localStorage i.e. the browser's storage & look for item with key "passwords"

        // step83: localStorage always returns a string (even though we stored it as array , still returns a string only always) if key exists , else returns  null
        let passwords = localStorage.getItem("passwords")
        // step84: we then check if it exists there : then we update the passwordArray state to : the value retrieved from localStorage ; we have used JSON as localStorage returns string , but we want to store it as array in the setPassordArray , so we convert it to array using this JSON.parse method here below.
        if(passwords){
            setpasswordArray(JSON.parse(passwords))
        }
    // step81: we have kept it [] to make this useEffect to run only once and that too , when the webpage is loaded for the first time OR whenever the webpage is reloaded there.
    }, [])
    

    // step52: lets define the showPassword function now here.
    const showPassword = () =>{

        //alert("show pass") // this we can put just to check if its working or not initially.

        // step55: now lets use the eyeRef that we used to target the eye icon and change it to crossed eye icon when we click on it.
        // eyeRef.current.src = "/icons/eyecross.png"

        // step56: now lets make it to toggle between the two eye icons there , by puttinng a if-else condition below here.
        // if(eyeRef.current.src === "/icons/eyecross.png"){
        //     eyeRef.current.src = "/icons/eye.png"
        // }
        // else{
        //     eyeRef.current.src = "/icons/eyecross.png"
        // }

        // console.log(eyeRef.current.src )

        // step57: the above code was not working so we did console log of it above & saw that : its showing the full url , so obviously it won't be exactly === to the /icons/eye.png that we are equating it too ; so we rather use ".includes" method below that just checks if the string is in it or not

        // step139: now we make that : if the eye is clicked to crossed-eye ; we make its type back to text OR else make its type equal to password again.

        if(eyeRef.current.src.includes("/icons/eyecross.png")){
            eyeRef.current.src = "/icons/eye.png"
            // step140: so we use passRef we made to target that input tag and make its type to what we want on clicking the crossed eye button.
            passRef.current.type = "password"
        }
        else{
            eyeRef.current.src = "/icons/eyecross.png"
            // step141: so we use passRef we made to target that input tag and make its type to what we want on clicking the eye button.
            passRef.current.type = "text"
        }
    }

    // step60: lets now define the savePassword function below.
    const savePassword = ()=>{

        // step77: lets console log the "form" state on clicking the button below ; on the website ; to see if "form" state is getting updated or not by the setform function that we wrote.
        console.log(form)

        // step78: now we can submit this "form" in a database too : by making an API and saving this in a database ; but lets see how it saves this in "localStorage" first : which is better based on Safety Point of View : as we dont want to save our passwords on a server's database ; rather keep it in the storage of the broswer only : SO LETS SEE HOW TO SAVE THE PASSWORD ON THE LOCAL STORAGE OF THE BROWSER NOW IN THE NEXT STEP 79 THERE.

        // step85: the spread operator "..." takes all the items currently in the state "passwordArray" and copies them into a new array.

        // step86: then it adds "form" at the end of the new array ; like if we had -
        /*
        current state passwordArray = [{site: "abc", password: "123"}]

        form = {site: "xyz", password: "456"} ; made by setform that we had seen earlier

        ;then [...passwordArray, form]  gives us -
        // [{site: "abc", password: "123"}, {site: "xyz", password: "456"}]
        */

        // step87: NOTE THAT : in earlier setform({...form , _____ }) ; we had { } , but here we have [ ] because there "form" state was storing object which is enclosed in { } , here its array so use [ ] to enclode it like done below.

        // step88: so finally like every setState functions do : This will cause your UI to re-render and show the updated list.
        setpasswordArray([...passwordArray , form])

        // step89: now we use the setItem function to store the passwords we typed in the localStorage.

        // step90: Since localStorage only stores strings ; so we take the array we made above i.e. [...passwordArray , form] & made the JSON to string using "JSON.stringify" and then stored in localStorage under the key "passwords" there.

        // step91: The [...] syntax creates a new array with: All the elements from the existing passwordArray and the new form object appended at the end . Then we do JSON.stringify to this updated array, so that it contains both old and new entries before saving it to the localStorage.
        localStorage.setItem("passwords" , JSON.stringify([...passwordArray , form]))

        // step92: we below console logged the array with all the passwords saved in it , along with the password we saved just now too. 
        console.log([...passwordArray , form])

        // step93: NOTE THAT : we didn't use "passwordArray" but used "[...passwordArray , form]" in the setItem as well as the console line above because : any setState function schedules a re-rendering , but it doesn't happens immediately but takes time ; so if we try to log the console.log(passwordArray) directly , then it will not contain the form we submitted just now & will contain the previously stored array of forms only , because : Since React hasn’t re-rendered yet, we will then be logging the old state only there : The update will reflect on the next render, usually after the function exits and React batches the updates.

        // step94: Thats why we used "[...passwordArray , form]" , as it contains the old values as well as the newly added form object at the end of that old array here.

        // step95: now even if we refresh the webpage ; we see that the items stored in : INSPECT > APPLICATIONS > LOCALSTORAGE : the items are not going from there ; indicating that it has been / it gets : stored to the localStorage of the browser too on clicking the Add Password button here.

    }

    // step69: now we define the handleChange function below.

    // step70: pass the event object "e" as we are using eventHandler onChange , which needs to have "e" parameter here : to handle the different things to happen by the event change i.e. change in the input tag there.
    const handleChange = (e)=>{

        // step71: so we are giving a new object { } to setform here : where "...form" copies all the existing values from the current "form" state into the new object , that the setform will make the "form" state's value to : so initially , the ...form makes the new object to start from the current object in the "form" state which we have kept : {site: "" , username: "" , password: ""} : this initially ; then when we type anything in the input tag there : like we types google.com in the first input tag with name="site" ; so then : onChange gets fired as we have changed the value of that input tag and so : React passes the object "e" to the handleCange function ; so here now : "...form" spreads the current object first i.e. {site: "" , username: "" , password: ""} ; then e.target is : <input> as that was the element which was changed : then we have e.target.name "site" & e.target.value is what we typed in it > so setform makes the "form" state as : {site: "google.com" , username: "" , password: ""} ; later we type in the 2nd input tag "nischay" ; so it overwrites the current form state's username value and makes it : {site: "google.com" , username: "nischay" , password: ""} ... and so on.... ; this keeps going on.

        // step74: thats why we have written in the form of [e.target.name] : e.target.value ; as the form state also had the objects like {"username : "" } i.e. seperated by : , so thats why we use : in setform while setting the form too below.

        // step75: Also we have used [ ] because : When you put it inside square brackets [ ], JavaScript interprets it as "Use the value of this variable as the key name" — and not just the literal text "e.target.name".

        // step76: thus based on our input we type in the respecrive <input> tag ; the "form" state keeps on getting updated using the below line
        setform({...form , [e.target.name] : e.target.value})
    }

    // step150: lets define the copyText function now below to copy the text.
    const copyText = (text) => {

        // step156: instead of alert : we now give a React toast by copying and giving the ToastEmitter code here below > so the toast will pop every time we copy now.
        toast.info('Copied to Clipboard', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
        // transition: Bounce,
        });

        // step153: just a check alert placed here to verify that the text has been copied successfully .
        // alert("copied to clipboard : " + text)

        // step151: the following code below : copies the given text to the user’s clipboard

        // step152: we had passed item.site OR item.username ... so on inside the "text" parameter of the function here : so that value gets copied for its corresponding copy icon there : as we had map function there , which had "uitem" as each form which was a object with : {site : " " , username : " " , password : " "} : so we accessed it using item.site , item.username & ... so on .. there when passed to copy as "text" argument passed to this fucntion written here.

        navigator.clipboard.writeText(text)
    }

  return (
      // step12: wrap in react fragments to have mutliple div elements inside it , available here.
      <>

    {/* step155: then we copy the code of ToastContainer from there and place it inside the "return" block here : WE CAN ALSO CHOOSE THE OTHER OPTIONS THERE BELOW TO MAKE IT DARK THEME OR SO , AND COPY THE CODE AFTER THAT HERE AND IN TOAST EMITTER TOO DONE ABOVE AND SO ON..... */}
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
        theme="light"
        // step157: it was showing bounce not defined , so we removed that line from here below , to remove that problem itself here & same done in the toast-emitter code too there.
        // transition={Bounce}
    />

    {/* step9: use "bg.ibelick" website to get a background code of tailwind css and paste here below. */}

    {/* step17: we can change color too like done below : we changed color from purple to green below.*/}

    {/* step42: we now can give the background changed too , by making it from bg-white to some shades of green or whatever we want here. */}

    {/* step58: we saw some errors coming in console log ; so we renamed class to className here below in the div that we copied from ibeclick website for the background ; as we are using tailwindCSS here and Recat ; not HTML CSS */}

    <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

    {/* step11: now lets make the manager component in the div below. */}

    {/* step12: put them in a outer div , with class "container" and mx-auto , to make everything horizontal in the screen ; as "container" class makes it take full screen's width and then mx-auto makes items inside it to be horizontally central aligned. */}

    {/* step15 : we now give it a temporary background color to see where an how it is : WILL REMOVE IT LATER , for easier modifications after that : and we then put some smaller max width as now we don't want it to take full width : so remove container which takes the max width of the device screen and put some smaller max-width*/}
    {/* <div className='container mx-auto bg-slate-800 '> */}

    {/* step20: now we can comment the below line and use the apply-directive of index.css directly here. */}

    {/* <div className='max-w-4xl mx-auto bg-slate-800 '> */}

    <div className='mycontainer'>

        {/* step16: lets write the content to be displayed inside this now */}

        {/* step26: lets style the h1 by copying the same navbar's logo styles here*/}

        {/* step27: give text-centre to come in centre of the screen as we had used container her ei.e. full width of screen is the width noe & we centre it in that width i.e. make it come at the centre of the screen there/here. */}
        <h1 className="font-bold text-4xl text-center">
                <span className="text-green-700">&lt;/</span>
                <span>Pass</span>
                <span className="text-green-700">OP</span>

                <span className="text-green-700">/&gt;</span>
        </h1>
        {/* step28: lets style the p tag now below similarly. */}
        <p className='text-center text-green-900 text-lg'>Your own Password Manager</p>

        {/* step13: now we want three input tags ; one at top , and the other two below it , horizontally in the same line there : so we make one input tag in a div ; and the other two in another div which is flexbox , to keep the two divs in same horizontal line there. */}

        {/* step35: give some gaps between the items inside to have space between the upper and lower lines of input tags in the column flexbox here. */}

        {/* step41: we put items centre to make things centred because its flex col , not horizontal one : so need to make it centred using "items" and not"justify" here. */}
        <div className='text-black flex flex-col p-4 gap-8 items-center'>
            {/* step14: make it have border-radius now */}

            {/* step29: lets give it green border to the input tag here below. */}
            {/* step30: give text-black for text written inside to be black in color when typed. */}
            {/* step31: also give w-full ; so that it takes 100% width of its parent container. */}
            {/* step32: give paddings to make text inside have some spacing from the borders. */}

            {/* step44: add the placeholder to all the input tags now. */}

            {/* step62: now we set VALUE for each of the input tags below : as by rule : VALUE TELLS THE TEXT WRITTEN INSIDE THE INPUT TAG. */}

            {/* step63: so now : Whatever {form.site} in the React state currently holds will be shown inside that input box here below */}

            {/* step66: we also add onChange function , which runs the handleChange function , everytime anything inside the value of input tag is changed. */}

            {/* step73: we also now make the name of each input tags to their respective names by logic here below. */}
            <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="text" name="site" id="" />

            {/* step34: make its width as 100% of its parent i.e. of the input tag above it ; by using w-full here below. */}

            {/* step36: give it also some justify and gaps as per choice.*/}
            <div className='flex w-full justify-between gap-8'>
                {/* step33: use the same class used above for the two input tags below too */}

                {/* step64: so now : Whatever {form.username} in the React state currently holds will be shown inside that input box here below */}

                {/* step67: we also add onChange function , which runs the handleChange function , everytime anything inside the value of input tag is changed. */}
                <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="text" name="username" id="" />

                {/* step45: we now have to make a relative div ; relative to which we will place our show/unshow button for the passwords that we type here. */}
                <div className="relative">

                    {/* step65: so now : Whatever {form.password} in the React state currently holds will be shown inside that input box here below */}

                    {/* step68: we also add onChange function , which runs the handleChange function , everytime anything inside the value of input tag is changed. */}

                    {/* step136: make the type from "text" to "password" here ; to make it appear in dots like a password there. */}

                    {/* step137: we now set the ref here as passRef : so that we can target it later using this "passRef" in next steps above. */}
                    <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 text-black w-full p-4 py-1' type="password" name="password" id="" />
                    {/* step46: now we add a section to add the "show/unshow" icon for the passwords we write there now below ; and we have put it in span as we want it to be in the same line of the input tag and not below it ; so used span here and not div.*/}

                    {/* step49: we also put it as cursor pointer for this icon below */}

                    {/* step50: we can adjust the top and right in pixels using the [ ] brackets in Tailwind CSS here below , by hit-and-trial-method here. */}

                    {/* step51: now lets make it change the icon to crossed-eye icon on clicking the image here ; so we write a onclick function for it here below. */}
                    <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>

                        {/* step47: we now downloaded some images like show/unshow images and placed it in the : public folder , under the folder named "icons" there ; because in "public" folder , we put :in public/ any static file you want served directly by URL without importing or bundling. */}

                        {/* step48: we gave padding to make it a smaller icon and not too large there. */}

                        {/* step53: lets use ref now for the image , so that we can target it using ref.current onClicking it ; and change its icon to crossed-eye icon ; and lets name it as eyeRef.*/}
                        <img ref={eyeRef} className='p-1' width={26} src="/icons/eye.png" alt="" />

                    </span>
                </div>

            </div>
                {/* step37: make a button to save the password , outside the horizontal flexbox to make it come below the input tags & not in the same horizontal line. */}

                {/* step38: we now go on "lordicons" website and go in "solid icons" category and select the add icon by searching it : then we copy the script tag to import it and paste the script tag in "index.html" i.e. the global HTML page there & then copy the icon code below in the button tag  */}

                {/* step39: give classes to the button to style it. */}

                {/* step40: we give it width as fit-content ; so that it takes only the width to fit the items in it , not more than that. */}
                
                {/* step43: so we can add some border of 2px lets say too , using border-2 below. */}

                {/* step59: lets now save the password on clicking the "add" button below. */}
                <button onClick={savePassword} className='bg-green-600 hover:bg-green-500 rounded-full flex justify-center items-center px-8 py-2 w-fit gap-2 border-2 border-green-900'>
                    <lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover">
                    </lord-icon>
                    Add Password
                </button>
        </div>
        {/* step96: now lets make a div to display the passwords saved from the localStorage here : we make it inside the mycontainer class only , so that it applies to the properties of it , and remains inside the container only. */}
        <div className="passwords">

            {/* step107: lets use && operator which is used for conditional rendering i.e. <condition> && <component> : the component is rendered only if the condition is true , else not : its part of JAVASCRIPT : so we must write it inside a { } in JSX here in React : as we always write JavaScript inside { } in React JSX by rule always here. */}


            {/* step106: give some styles to the h2 tag here now below. */}
            <h2 className='text-2xl font-bold py-4'>Your Saved Passwords</h2>

            {/* step108: so lets display the following when there is no password inside the passwordArray here below. */}
            {passwordArray.length === 0 && <div>No passwords to display here</div>}

            {/* step97: lets search for table layout in TailwindCSS and copy and use the table-layout there : which : Uses the table-auto utility to automatically size table columns to fit the contents of its cells: so we use it below here ; which we will modify after that below - */}

            {/* step98: lets use w-full to make it take 100% width of its parent container. */}

            {/* step99: we need to give "overflow-hidden" as then only border radius gets applied in tables : ITS A RULE ALWAYS. */}

            {/* step109 : in continuation to step108 : if that condition not true i.e. if there are passwords in the array then only we render the following table below. */}
            {passwordArray.length != 0 &&
            <table className="table-auto width w-full overflow-hidden rounded-md">
                {/* step100: on the header row of the table : lets put bg-green and white text now. */}
                <thead className='bg-green-800 text-white'>
                    <tr>
                    {/* step104: we now give some vertical paddings to the headers of each column of the table below. */}
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    {/* step158: now we make another column with heading "Actions" to have the edit & delete option in it. */}
                    <th className='py-2'>Actions</th>
                    </tr>
                </thead>
                {/* step103: also lets give some color to the body of the table too below. */}
                <tbody className='bg-green-100'>

                    {/* step110: lets now use the .map() function to go through each element/object in the passwordArray now & creates/returns a new <tr> for every loop there : so : "item" holds the current object in the array i.e. { site: "google.com", username: "abc", password: "123" }) and index refers to the index in the array : so we use the different keys accessed using item.site , item.username ... and so on .... : we use them for the data to be filled in each table cell , every time */}

                    {/* step111: index is never defined by user but its a property of .map() function that it refers to the index of each item ; like if we have -
                    
                    const arr = ['apple', 'banana', 'cherry'];
                    arr.map((item, index) => {
                    console.log(item, index);
                    });
                    Then the output would be -

                    apple 0
                    banana 1
                    cherry 2

                    So , when we write index there : its an argument automatically passed by JavaScript.
                    */}

                    {passwordArray.map((item , index)=>{
                        // step112: we always have to pass a unique key to each item returned by .map() by rule of .map() function ; so we need to put a key here below : so lets put the key as index itself as we know index is always unique i.e. 0,1,2,3 ...... so on.
                        return <tr key = {index}>

                            {/* step113: so we now wrap the text in the first cell in <a> tag : so that > it will open that item's site as the link entered there & we use target = '_blank' : so that it opens the page in new tab when clicked on it here. */}

                            {/* step114: now see Navbar.jsx now for updating the UI there. */}

                            {/* step145: make the <td> now flexbox and align and justify the items in it to be : both justify and items centre : to make it be centred and look clean on the webpage. */}

                            {/* step146: we remove the w-32 that we had given it earlier here : to remove problems that was coming in the looks on the webpage there. */}

                            {/* step148: but we later realized that making <td> as flexbox was destroying the structure of the table so ; lets wrap the lordicons in a div with the flex and all we gave instead in that. */}
                            <td className='py-2 border border-white text-center'><a href={item.site} target="_blank"></a>

                            {/* step142: lets add the "copy" button from lord-icons again now & put it in a div to style it maybe in a better way here. */}

                            {/* step143: lets give the container containing it a size of 7 ; which means both h-7 and w-7 combined is size-7 in TailwindCSS ; and also give it a cursor pointer here.*/}
                                <div className="flex justify-center items-center">
                                    <span>{item.site}</span>

                                    {/* step149: we make a onClick function to copy the text there when clicked on this icon inside this div made below : and we make it as an arrow function as if we just do onClick{copyText} then it runs on the render of the webpage immediately ; but since we want it to work on clicking it ; so must make it as an arrow function like done below. So, now it will run only on clicking it and not on render of the webpage ; earlier if we didn't made arrow function then we would have ended up with : getting undefined copied on clicking it as it runs the function on rendering only if we dont use arrow function ; but nwo since we have used an arrow function ; so it runs the function every time we click it now.*/}
                                    <div className='size-7 cursor-pointer' onClick = {() => copyText(item.site)}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xuoapdes.json"
                                            trigger="hover"

                                            // step144: the size we get from lord-icons library is not react compatible ; so we can make so by keeping its styles as an object in a { }and then keeping that object inside another { } to tell its a JavaScript that we wrote here ; also we need to make it in " " everything as its an object now , to make the styling inside lord-icon as React compatible in our code here. So , now : The outer {} means “JS expression” inside JSX. The inner {} is a JavaScript object with key-value pairs. NOTE : here syntax is paddingTop and paddingLeft ; and not padding-top , padding-left here like done below.
                                            style={{"width":"20px" , "height":"25px" , "paddingTop":"3px" , "paddingLeft" : "3px"}}>
                                        </lord-icon>
                                    </div>
                                </div>
                            </td>

                            {/* step147: now add the flex and all we added to the <td> above in bottom two <td> too and also add the div for lord icon made above here too and also remove the w-32 like we removed in the above td too.*/}
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
                            {/* step159: we add one more td now for the Actions column that we made. */}
                            <td className='py-2 border border-white text-center'>
                                {/* step161: lets give it cursor pointer now. */}

                                {/* step164: we now give mx-1 in both spans to maintain some distance between each other there. */}
                                <span className='cursor-pointer mx-1'>
                                    {/* step160: now put the edit icon inside a span to keep it in a sam eline and not below other eleements as we want the edit & delete icons to be in the same horizontal line here. */}
                                    <lord-icon
                                        src="https://cdn.lordicon.com/qawxkplz.json"
                                        trigger="hover"
                                        style={{ "width": "20px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                    >
                                    </lord-icon>
                                </span>

                                {/* step162: make the delete icon in same way , just the src changes now. */}
                                {/* step163: thats why we had kept a span as we wanted them to be in the same line here. */}
                                <span className='cursor-pointer mx-1'>
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

                    {/* WE HAVE COMMENTED OUT THE BELOW TABLE LATER AS WE WANTED TO PLACE IT INSIDE THE MAP FUNCTION WRITTEN ABOVE : SO WE COMMENTED IT BELOW AND COPY PASTED IT THERE ABOVE HERE. */}

                    {/* <tr> */}

                    {/* step101: now we select <td> right click > change all occurences for faster change to all : and apply : text-center > it will center the text horizontally inside each <td> cell there/here. */}

                    {/* step102: we also set the width of each cell to w-32 here. */}

                    {/* step105: can give some vertical padding in each <td> cells too with some white border of 10px using border-1 OR simply just border in the className below. */}
                    {/* <td className='py-2 border border-white text-center w-32'>{item.site}</td>
                    <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                    <td className='py-2 border border-white text-center w-32'>{item.password}</td> */}
                    {/* </tr> */}
                </tbody>
            </table>
            }
        </div>
    </div>
    </>
  )
}

export default Manager
