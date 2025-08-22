// step122: lets write "rafce" and start building this now below.
// step123: include it in the App.jsx file now there.
import React from 'react'

const Footer = () => {
  return (
    // step127: Now we put a div here and make it a flexbox and flex-col to make them appear one below the other ; also give justify centre and items centred to make the items inside it to be centred in this container here.

    // step134: now we make it fixed at bottom-0 of the webpage & also make it take the 100% width of the parent i.e. the HTML as there is no ther parent of it here obviously here , using w-full given below.

    // step135: now next step in Manager.jsx now.
    // <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>

    // step193: now we were getiing a problem when we made it responsive as it was not scrolling due to the fixed footer ; so we rmeoved this to resolve that problem & rather gave min-h in mycontainer in manager4.jsx to make footer to be at bottom in larger devices.
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
        
        {/* step128: lets now copy paste the logo that we used in navbar here below */}
        <div className="logo font-bold text-2xl text-white">
                <span className="text-green-700">&lt;/</span>
                Pass
                <span className="text-green-500">OP</span>
                <span className="text-green-700">/&gt;</span>
        </div>
        {/* step129: then we add a text inside the flexbox as we want it to be below the logo above ; thats why we used flex-col in the flexbox here. */}

        {/* step130: make it flexbox to make the text below and the image to come in the same line hroizontally here. */}

        {/* step131: add justify and items centred to it ; in order to make them be centre in the container horizontally as well as vertically and be in a single line too , with equal distance from the top and bottom too here. */}
        <div className='flex justify-center items-center'>
            {/* step132: now adjust the image width and give margins from left and right to it too , like done below. */}
            Created with <img className='w-7 mx-2' src="/icons/heart.png" alt="" /> using React and Tailwind
        </div>
    </div>
  )
}

export default Footer
