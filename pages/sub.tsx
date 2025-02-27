import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}




export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  async function addProductApiHandler(){
    const result = await fetch("/api/products",{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({name,price})
    })

    console.log(result)
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">商品列表</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border p-2 mb-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <div className="">
        <label htmlFor="name">商品名稱</label>
        <input type="text" id="name" onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className="">
        <label htmlFor="price">商品價格</label>
        <input type="number" id="price" onChange={(e)=>setPrice(Number(e.target.value))} />
      </div>
      <button onClick={addProductApiHandler}>Add Product</button>
    </div>
  );
}