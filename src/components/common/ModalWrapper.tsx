import { useEffect } from "react"
import ReactDOM from "react-dom"

interface Props {
  children: React.ReactNode
  theme: string
  title: string
}

export default function ModalWrapper(props: Props) {

  useEffect(() => {
    document.body.classList.add('active-modal')

    return () => {
      document.body.classList.remove('active-modal')
    }
  }, [])
  return ReactDOM.createPortal(
    <div data-testid='modal' className={`modal`}>
      <div className="overlay">
        <div className={`modal-content ${props.theme}`}>
          <h2>{props.title}</h2>
          {props.children}
        </div>
      </div>
    </div>, document.getElementById('root')!
  );
}
