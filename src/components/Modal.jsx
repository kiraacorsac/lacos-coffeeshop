import style from "./Modal.module.css";

//props.visible -> says if modal should appear
export default function Modal(props) {
    if (props.visible) {
        return <div className={style.modal}>
            {props.children}
        </div>
    } else {
        return null;
    }
}