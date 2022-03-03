import logo from './icons/logo.svg'

import { Canvas, Timer, Vote } from './components'

function App() {
  return (
    <div className="w-full px-16 pt-11">
      <header className=" mb-11 flex justify-between">
        <img src={logo} className="h-10" alt="logo" />
        <button
          className="rounded-md text-white px-6 py-4 leading none"
          style={{
            background:
              'linear-gradient(61.2deg, #FF5416 10.46%, #FE5215 38.63%, #FC4A13 54.38%, #F73C10 67.07%, #F1280A 78.13%, #E90F04 88.02%, #E40000 92.73%)',
          }}
        >
          Get your free account
        </button>
      </header>
      <div className="grid grid-cols-3 gap-4">
        <div className="row-span-2 col-span-2">
          <Canvas />
        </div>
        <div className="rounded-lg shadow-lg bg-white text-center ">
          Presence Component
        </div>
        <div className="rounded-lg shadow-lg bg-white text-center">
          <Timer />
        </div>
        <div className="col-start-3 h-80 rounded-lg shadow-lg bg-white text-center">
          <Vote />
        </div>
      </div>
    </div>
  )
}

export default App
