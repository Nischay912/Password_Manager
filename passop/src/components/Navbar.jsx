// step3: lets create a navbar now ; by starting of with getting the boilerplate here using "rafce"
import React from 'react'

const Navbar = () => {
  return (
    // step4: design the navbar now , using tailwindcss below.

    // step5: can give heights to maintain the height of navbar vertically and items centre to be vertically centred from top and bottom

    // <nav className='bg-purple-200 flex justify-between h-14 items-center'>
    //     {/* step6: give margin-left to logo and margin-right to ul ; to make them be separated from the left and right boundaries of the webpage. */}
    //     <div className="logo font-bold ml-8">PassOp</div>
    //     <ul className='flex gap-8 mr-8'>
    //         <li><a href="/" className='hover:font-bold'>Home</a></li>
    //         <li><a href="/" className='hover:font-bold'>About</a></li>
    //         <li><a href="/" className='hover:font-bold'>Contact</a></li>
    //     </ul>
      
    // </nav>

    // step21: we commented out above one and now make our own Navbar again using the apply directive class of index.css
    <nav className='bg-slate-800 text-white'>
        {/* step22: but settig the mycontainer class gave it way too py of it than needed for navbar , so we overrided it with py-5 here below ; rest class of mycontainer still applies here below. */}
        <div className="mycontainer flex justify-between items-center h-14 py-5">

            {/* step23: now we want to style this logo too below , so lets do it below. */}
            <div className="logo font-bold text-2xl">
                {/* step24: lets put lessthan and greater than symbol , along with / before and after it below here. */}
                <span className="text-green-700">&lt;/</span>
                Pass
                {/* step25: lets put the OP as green too */}
                <span className="text-green-500">OP</span>

                <span className="text-green-700">/&gt;</span>
            </div>

            {/* step120: we now not need this navbar as was not looking good here : so lets uncomment it here below. */}

            {/* step121: now see footer folder for next steps there. */}
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className="hover:font-bold" href="/">Home</a>
                        <a className="hover:font-bold" href="/">About</a>
                        <a className="hover:font-bold" href="/">Contact</a>
                    </li>
                </ul> */}
                {/* step115: lets create a button now in navbar for github written in there. */}

                {/* step116: we give it background and text color first and then make it flexbox to make logo and text to come in the same line horizontally and vertically aligned using items-centre & at the two ends of button using justify-between them. */}

                {/* step117: can give some margins too if needed & rounded-full for border-radius full there ; can also use a rig property similar to border it is. */}
                <button className='bg-green-800 text-white flex items-center justify-between mx-2 my-5 rounded-full ring-1 ring-white'>
                    {/* step118: we make it invert in order to be of correct color as we have put it in dark navbar and svg default also was black ; so used invert to invert its color & gave width as per need to make it smaller ; and usually giving a padding-1 makes the logo smaller by hit and trial so we gave it too here below. */}
                    <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />

                    {/* step119: make the text bold and some paddings from the sides if needed here below. */}
                    <span className='font-bold px-2'>GitHub</span>
                </button>
        </div>
    </nav>
  )
}

export default Navbar
