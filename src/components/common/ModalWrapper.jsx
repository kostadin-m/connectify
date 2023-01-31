export default function ModalWrapper(props) {
  return (
    <div className={`modal`}>
      <div className="overlay">
        <div className={`modal-content ${props.theme}`}>
        {props.children}
        </div>
      </div>
    </div>
  );
}
