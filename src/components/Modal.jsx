import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
   const dialog = useRef();
   useImperativeHandle(ref, () => ({
      open() {
         dialog.current.showModal(); 
      }
   })); 

   function handleSubmit(e) {
      e.preventDefault();
      dialog.current.close(); 
   }

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      { children }
      <form onSubmit={handleSubmit} action="dialog" className="mt-4 text-right"> {/* Setting the action to dialog closes the modal when the form is submitted */}
         <Button>{ buttonCaption }</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
