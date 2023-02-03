import { useEffect } from "react"
import ReactDOM from "react-dom"

interface Props {
  children: React.ReactNode
  theme: string
}

export default function ModalWrapper(props: Props) {

  useEffect(() => {
    document.body.classList.add('active-modal')

    return () => {
      document.body.classList.remove('active-modal')
    }
  }, [])
  return ReactDOM.createPortal(
    <div className={`modal`}>
      <div className="overlay">
        <div className={`modal-content ${props.theme}`}>
          {props.children}
        </div>
      </div>
    </div>, document.getElementById('root')!
  );
}
