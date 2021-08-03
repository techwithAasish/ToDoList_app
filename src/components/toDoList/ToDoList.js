import React, { useState, useEffect } from "react";
import "./style.css";

//   how to fetch the data from the local storage
const getLocalData = () => {
  const lists = localStorage.getItem("toDOList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const ToDoList = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //   how to add items

  const addItem = () => {
    if (!inputdata) {
      alert("plz enter the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem();
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // how to edit the data
  const editItem = (index) => {
    const item_tobe_eidted = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_tobe_eidted.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //   how to delete the items

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //   hwo to remove all the items
  const remmoveItem = () => {
    return setItems([]);
  };

  //   how to add items in local storage

  useEffect(() => {
    localStorage.setItem("toDOList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add your List Here 👈</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍Add Item..."
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* Show our items */}

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={remmoveItem}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
