"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent ,useState } from "react";


export default function AddProducts() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [modal, setModal] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () =>{
    setModal(!modal);
  }
  async function handleSubmit(e: SyntheticEvent){
    
    e.preventDefault()
    setIsMutating(true)
    await fetch(`http://localhost:5000/products`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        price: price
      })
    })
    setIsMutating(false)
    setTitle('')
    setPrice('')
    router.refresh()
    setModal(false)
  }
  return (
    <div>
        <button className="btn" onClick={handleChange}>Add New</button>
        <input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Data</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                name="title"
                onChange={(e) => {setTitle(e.target.value)}}
                className="input w-full input-bordered"
                placeholder="Enter product name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                name="price"
                onChange={(e) => {setPrice(e.target.value)}}
                className="input w-full input-bordered"
                placeholder="Enter price"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type={!isMutating ? 'submit' : 'button'} className={`btn ${!isMutating ? 'btn-primary' : 'loading'}`}>
                {!isMutating ? 'Add' : 'Adding...'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
