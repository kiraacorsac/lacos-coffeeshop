import style from "./Modal.module.css";

//props.visible -> says if modal should appear
export default function Modal(props) {
  function onModalClose() {
    props.setModalFlag(false);
  }

  if (props.visible) {
    // fix onModalClose triggering when clicking on children of modal wrapper
    return (
      <div className={style.modalWrapper} onClick={onModalClose}>
        <div className={style.modal}>{props.children}</div>
      </div>
    );
  } else {
    return null;
  }
}
