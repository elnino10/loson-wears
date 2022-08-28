import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { hideCart } from "../../store/cartSlice";

export const Backdrop = () => {
  const dispatch = useDispatch();

  const hideCartHandler = () => {
    dispatch(hideCart());
  };

  return <div className="backdrop" onClick={hideCartHandler}></div>;
};

export const ModalOverlay = (props) => {
  return <div className="modal">{props.children}</div>;
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
