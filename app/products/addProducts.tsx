"use client";
import { useState } from "react";


export default function AddProducts() {
  const [modal, setModal] = useState(false)
  function handleChange(){
    setModal(!modal);
  }
  return (
    <div>
        <button className="btn" onClick={handleChange}>Add New</button>
        <input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Data</h3>
          <form>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                className="input w-full input-bordered"
                placeholder="Enter product name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="number"
                className="input w-full input-bordered"
                placeholder="Enter price"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
