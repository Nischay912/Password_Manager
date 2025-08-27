// step1: we delete all the states and import statements that were pre-written in order to create our own App now here.

// step2: delete all default index.css and App.css & then : install tailwind using vite from documentation of it.
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
// import Manager from './components/Manager'
import Manager6 from './components/Manager6'

function App() {
  return (
    <>
    {/* ADDED THIS LATER FOR RESPONSIVENESS TO BE THERE TO MAKE THE CONTENT TO BE OF WIDTH SUCH THAT : IT COVERS THE FULL CONTENT. */}
    <div className='w-fit md:w-full'>
      {/* step7: include the navbar component now here */}
      <Navbar/>
      {/* step10: include the manager component here */}

      {/* step125: we now put the Manager component in a div ; so that it takes some minimum heigth and keep the footer at the very bottom of the screen there. */}

      {/* step126: can put min-h using calc function to subtract the  Navbar's height in px and subtract from 100vh to get the footer at exact bottom OR just do by hit and trial like done below here. */}

      {/* step133: but we commented this div now as it would be better to give fixed & bottom-0 to the whole webpage for the footer instead there. */}

      {/* <div className='min-h-[87vh]'> */}
      {/* <Manager/> */}

      {/* we copied the background code we had given using ibelick thing there in manager.jsx here to manager so that the color is distributed in the whole manager part throughout as it was looking unevenly spread background color there earlier when bg given in manager.jsx only ; so to make it evenely spread in the container , we place maanger component here in this div with that background color itself now here below , to evenly spread that background color ein the manager component there now , thus here below here. */}
      <div className=' bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>

      <Manager6/>
      </div>
      {/* </div> */}
      {/* step124: lets include the footer component here */}
      <Footer/>
      </div>
    </>
  )
}

export default App
