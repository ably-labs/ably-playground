import sandbox from '../icons/sandbox.svg'
import github from '../icons/github.svg'
import external from '../icons/external-link.svg'

export function Buttons({
  githubLink = '',
  sandboxLink = 'https://codesandbox.io/s/perfect-freehand-example-forked-vjrkxj',
}) {
  return (
    <div className="flex absolute z-50 space-x-3 top-3 left-3">
      <a
        href={sandboxLink}
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer flex justify-center items-center space-x-2 p-2 bg-[#F1F2F4] rounded h-8"
      >
        <img src={sandbox} alt="logo" />
        <span>CodeSandbox</span>
        <img src={external} alt="logo" />
      </a>
      <a
        href={githubLink}
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer flex justify-center items-center space-x-2 p-2 bg-[#F1F2F4] rounded h-8"
      >
        <img src={github} alt="logo" />
        <span>GitHub</span>
        <img src={external} alt="logo" />
      </a>
    </div>
  )
}
