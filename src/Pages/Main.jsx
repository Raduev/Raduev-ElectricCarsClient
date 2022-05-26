import React from "react";
import "./main.css";
import loadingGif from "../assets/loadingGif.gif";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { GetElectricCars } from "../redux/features/ElectricCarReducer";
import { GetByCar } from "../redux/features/GetByCarReducer";
import { Link, NavLink } from "react-router-dom";

const Main = () => {
  const electricCars = useSelector(
    (state) => state.ElectricCarReducer.electricCar
  );

  const electricCarsLoading = useSelector(
    (state) => state.ElectricCarReducer.loading
  );

  const [chooseNumber, setChooseNumber] = useState(false);

  const [listNumber, setListNumber] = useState(0);

  const listNumberArr = [];

  for (let i = 0; i < electricCars.length; i++) {
    listNumberArr.push(electricCars[i].number);
  }

  let listNumberArr1 = [...new Set(listNumberArr)];

  const ChangeList = (index) => {
    setListNumber(index);
    setChooseNumber(true);
  };

  const ListLeft = () => {
    if (listNumber > 0) {
      setListNumber(listNumber - 1);
    }
  };

  const ListRight = () => {
    if (listNumber < Math.max(...listNumberArr1)) {
      setListNumber(listNumber + 1);
    }
  };

  const ClickCarts = (id) => {
    dispatch(GetByCar(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetElectricCars());
  }, [dispatch]);

  const [carName, setCarName] = useState("");

  const choosedNum = !chooseNumber
    ? `number-List-begin`
    : `number-List-choosed`;

  const filteredCars = electricCars.filter((item) => {
    return item.name.toLowerCase().includes(carName.toLowerCase());
  });
  console.log(carName);

  return (
    <main>
      <div className="main">
        <div className="cardsMain">
          <div className="mainTitle">
            <h2 className="carTitle">Электромобили</h2>

            <div className="searchDiv">
              <input
                className="search"
                value={carName}
                type="text"
                onChange={(e) => setCarName(e.target.value)}
                placeholder="🔍 Найдите свой электромобиль"
              />
            </div>

            <div className="lineBlock">
              <hr className="mainLine"></hr>
            </div>
          </div>
          <div className="ElectroCarCarts">
            <h1
              className={!carName == false ? "emptyArrow" : ""}
              onClick={ListLeft}
            >
              <i class={!carName == false ? "emptyLeft" : "arrow left"}></i>
            </h1>
            {electricCarsLoading !== true ? (
              filteredCars == false ? (
                <div className="EmptyBlock">
                  <h1 className="empty">Ничего не найдено</h1>
                </div>
              ) : (
                filteredCars
                  .filter((it) => {
                    if (it.number === listNumber) {
                      return it;
                    }
                  })
                  .map((item) => {
                    return (
                      <div className="CartBlock">
                        <Link
                          className="LinkBlock"
                          to={`/ByCar/${item._id}`}
                          onClick={() => ClickCarts(item._id)}
                        >
                          <img className="carImg" src={item.image} alt="" />
                          <h3 className="carName">{item.name}</h3>
                        </Link>
                      </div>
                    );
                  })
              )
            ) : (
              <div className="LoadingBlock">
                <img className="LoadingGif" src={loadingGif} />
              </div>
            )}
            <h1
              className={!carName == false ? "emptyArrow" : ""}
              onClick={ListRight}
            >
              <i class={!carName == false ? "emptyRight" : "arrow right"}></i>
            </h1>
          </div>
          <div className={!carName == false ? "emptyMainList" : "mainList"}>
            {listNumberArr1.map((item, index) => {
              return (
                <h2
                  className={item == listNumber ? choosedNum : "number-List"}
                  onClick={() => ChangeList(index)}
                >
                  {item + 1}
                </h2>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
