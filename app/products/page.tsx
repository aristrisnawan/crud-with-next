import AddProducts from "./addProducts";
import DeleteProducts from "./deleteProducts";
import EditProducts from "./editProducts";

interface Products {
  id: number;
  title: string;
  price: number;
}

async function getProducts() {
  const url = `http://localhost:5000/products`;
  const response = await fetch(url, { cache: "no-store" });
  return response.json();
}

export default async function ProductList() {
  const products: Products[] = await getProducts();
  return (
    <div className="p-10">
      <div className="py-2">
        <AddProducts/>
      </div>
      <table className=" table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((datas, idx) => {
            return (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{datas.title}</td>
                <td>{datas.price}</td>
                <td className=" flex gap-x-2"><DeleteProducts {...datas}/> <EditProducts {...datas}/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
