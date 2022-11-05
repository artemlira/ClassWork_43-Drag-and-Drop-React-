import { useState, useEffect } from 'react';
import { pic } from './DB';

function App() {
  const level = [
    { id: 0, elem: pic[0] },
    { id: 1, elem: pic[1] },
    { id: 2, elem: pic[2] },
    { id: 3, elem: pic[3] },
  ];
  const [userLevel, setUserLevel] = useState([
    { id: 0, elem: null },
    { id: 1, elem: null },
    { id: 2, elem: null },
    { id: 3, elem: null }
  ]);

  const [currentCart, setCurrentCart] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [result, setResult] = useState([]);
  const [area, setArea] = useState(null);


  useEffect(() => {
    setResult(userLevel.map((item, index) => {

      if (item.elem === level[index].elem) {
        return true;
      } else {
        return false;
      }
    }))

  }, [userLevel]);

  useEffect(() => {
    if (result.length > 0) {
      console.log(result.every(item => item === true));
    }

  }, [result]);

  const dragOverHandler = (e, floor) => {
    e.preventDefault();
    e.target.style.outline = '#777 dashed 3px';
    e.target.style.outlineOffset = '-7px';
    setCurrentFloor(floor);

  }

  const dragLeaveHandler = (e) => {
    e.target.style.outline = null;
    e.target.style.outlineOffset = null;
  }
  const dragStartHandler = (e, cart, c) => {
    setCurrentCart(cart);
    setArea(c);
  }

  const dropHandler = (e, cart) => {
    e.preventDefault();

    if (area === 'one') {
      setUserLevel(userLevel.map(item => {
        if (item.id === currentFloor.id) {
          return { id: item.id, elem: currentCart.elem };
        } else {
          return item;
        }
      }))
    }

    if (area === 'two') {
      setUserLevel(userLevel.map(item => {
        if (item.id === cart.id) {
          return { id: item.id, elem: currentCart.elem }
        }

        if (item.id === currentCart.id) {
          return { id: item.id, elem: cart.elem }
        }

        else return item;
      }));
    }
    e.target.style.outline = null;
    e.target.style.outlineOffset = null;
  }

  return (
    <div className="wrapper">
      <div className='wrapper__one'>
        <h2>Звідкіля</h2>
        <ul className="floor" >
          {level.map(item => <li key={item.id}
            className="floor__item">
            <img
              src={item.elem}
              alt="pic"
              draggable={true}
              onDragStart={e => dragStartHandler(e, item, 'one')}

            />
          </li>
          )}
        </ul>
      </div>
      <div className='wrapper__two'>
        <h2>Куди</h2>
        <ul className="floor" >
          {
            userLevel.map(item => <li
              key={item.id}
              className="floor__item"
              onDragOver={e => dragOverHandler(e, item)}
              onDragStart={e => dragStartHandler(e, item, 'two')}
              onDragLeave={e => dragLeaveHandler(e)}
              onDrop={e => dropHandler(e, item)}

            >
              {item.elem && <img src={item.elem} alt='pic' />}
            </li>)
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
