import logo from './icons/logo.svg'

import { Canvas, Timer, Vote, AvatarStack, Buttons } from './components'

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
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        <div className="relative rounded-lg shadow row-span-3 col-span-2 overflow-hidden">
          <Buttons githubLink="https://github.com/ably-labs/ably-playground/blob/main/src/components/DrawingCanvas/Canvas.jsx" />
          <Canvas />
        </div>
        <div className="relative rounded-lg shadow bg-white text-center flex items-center justify-center">
          <Buttons githubLink="https://github.com/ably-labs/ably-playground/blob/main/src/components/AvatarStack/AvatarStack.js" />
          <AvatarStack />
        </div>
        <div className="relative rounded-lg shadow bg-white text-center">
          <Buttons githubLink="https://github.com/ably-labs/ably-playground/blob/main/src/components/Timer/Timer.jsx" />
          <Timer />
        </div>
        <div className="relative col-start-3 rounded-lg shadow-lg bg-white text-center">
          <Buttons githubLink="https://github.com/ably-labs/ably-playground/blob/main/src/components/Vote.jsx" />
          <Vote />
        </div>
      </div>
    </div>
  )
}

export default App
