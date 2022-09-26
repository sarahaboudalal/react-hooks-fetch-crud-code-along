import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
  fetch("http://localhost:4000/items")
  .then((resp) => resp.json())
  .then((data) => setItems(data));
}, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category)
  }

  function handleUpdateItem(updated) {
    console.log("hello")
    const updatedItems = items.map((item) => {
      if (item.id === updated.id) {
        return updated;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  function handleNewItem(newItem) {
    setItems([...items, newItem])
  }


  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm addedItem={handleNewItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item}
          onUpdatedItem={handleUpdateItem} 
          onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
