"use client";
import { useRouter } from "next/navigation";
import {useState } from "react";

type data = {
  id: number,
  title: string,
  price: number
}

export default function DeleteProducts(props: data) {
  const [modal, setModal] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () =>{
    setModal(!modal);
  }
  async function handleDelte(productId: number){
    setIsMutating(true)
    await fetch(`http://localhost:5000/products/${productId}`,{
      method: 'DELETE',
    })
    setIsMutating(false)
    router.refresh()
    setModal(false)
  }
  return (
    <div>
        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
        <input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete {props.title}</h3>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type='button' className={`btn ${!isMutating ? 'btn-primary' : 'loading'}`} onClick={() => handleDelte(props.id)}>
                {!isMutating ? 'Delete' : 'Deleting...'}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
