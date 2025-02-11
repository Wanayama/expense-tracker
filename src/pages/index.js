import React, { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Home() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [newItem, setNewItem] =useState({name: '', price: ''})
  

  //add expense to firebase
  const addItem = async(e) =>{
    e.preventDefault()
    if(newItem.name !== '' && newItem.price !== ''){
      await addDoc(collection(db, "expense"),{
        name: newItem.name.trim(),
        price: newItem.price
      })
      setNewItem({name: '', price: ''})
    }
  }


  //read expense from firebase
  useEffect(()=>{
    const q = query(collection(db, "expense"));
   onSnapshot(q, (querySnapshot) =>{
      let qArry = [];
     querySnapshot.forEach((doc) =>{
        qArry.push({...doc.data(), id: doc.id})
      });
      setItems(qArry)

      //Total calculation from qArry
      const addTotal = () =>{
        const totalPrice = qArry.reduce(
          (sum, items)=> sum + parseFloat(items.price),
          0
        );
        setTotal(totalPrice)
      };
      addTotal();
    })

  }, [])

  //delete expense from firebase
 const deleteItem = async (id) =>{
   await deleteDoc(doc(db, "expense", id))
 }


  return (
    <div
      className='items-center bg-black justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'
    >
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-white justify-center my-3 text-center text-4xl">Expense Tracker</h1>
        <form className="grid grid-cols-6 items-center text-black bg-slate-800 p-4 rounded-lg">
          <input
          value={newItem.name}
          onChange={(e)=>setNewItem({...newItem, name:e.target.value})}
          className="col-span-3 p-3 border rounded-md"
          type="text"
          placeholder="Enter item"
          />
          <input
          value={newItem.price}
          onChange={(e)=>setNewItem({...newItem, price:e.target.value})}
          className="col-span-2 p-3 border mx-3 rounded-md"
          type="number"
          placeholder="Price"
          />
          <button onClick={addItem} type="submit" className="text-white bg-slate-950 hover:bg-slate-700 rounded-md transition 1s ease-in p-3 text-xl">+</button>
        </form>
        <ul className="my-4 rounded-lg items-center bg-slate-800 p-4">
        {
          items.map((item, id) =>(
            <li key={id} className="my-2 w-full bg-slate-950 rounded-md flex justify-between">
              <div className="text-white w-full p-4 flex justify-between">
              <span className="capitalize">{item.name}</span>
              <span className="capitalize">{item.price}</span>
              </div>
              <button onClick={()=> deleteItem(item.id)} className="text-white p-2 border-l-2 border-slate-600 hover:bg-red-600">X</button>
            </li>
          ))
        }
        </ul>
        <div className="text-white text-xl">
          Total Amount Ksh{total}
        </div>
      </div>
    </div>
  );
}
