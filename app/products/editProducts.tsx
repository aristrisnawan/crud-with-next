"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent ,useState } from "react";

type data = {
  id: number,
  title: string,
  price: number
}

export default function EditProducts(product: data) {
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [modal, setModal] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () =>{
    setModal(!modal);
  }
  async function handleUpdate(e: SyntheticEvent){
    
    e.preventDefault()
    setIsMutating(true)
    await fetch(`http://localhost:5000/products/${product.id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        price: price
      })
    })
    setIsMutating(false)
    router.refresh()
    setModal(false)
  }
  return (
    <div>
        <button className="btn btn-sm btn-success" onClick={handleChange}>Update</button>
        <input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Data</h3>
          <form onSubmit={handleUpdate}>
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
                onChange={(e) => {setPrice(Number(e.target.value))}}
                className="input w-full input-bordered"
                placeholder="Enter price"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type={!isMutating ? 'submit' : 'button'} className={` ${!isMutating ? 'btn btn-primary' : 'loading'}`}>
                {!isMutating ? 'Update' : 'Updateing...'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
