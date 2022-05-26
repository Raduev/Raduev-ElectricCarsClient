import React from "react";
import "./ByCar.css";
import { GetByCar } from "../redux/features/GetByCarReducer";
import { GetElectricCars } from "../redux/features/ElectricCarReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ByCar = () => {
  const dispatch = useDispatch();
  const electricCars = useSelector(
    (state) => state.ElectricCarReducer.electricCar
  );
  const id = useParams("id");
  const filteredElectroCar = electricCars.filter((item) => {
    if (item._id === id.id) {
      return item;
    }
  });

  useEffect(() => {
    dispatch(GetElectricCars());
    dispatch(GetByCar(id));
  }, [dispatch, id]);

  return (
    <div className="ByCarBody">
      {filteredElectroCar.map((item, index) => {
        return (
          <div className="MidBlock">
            <h2 className="ByCarName">{item.name}</h2>
            <div className="DescriptionBlock">{item.description}</div>
            <div className="ByCarImgBlock"><img className="ByCarImg" src={item.image} alt="" /></div>
            <h2 className="PriceHeader">Цены</h2>
            <div className="PriceBlock">{item.price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ByCar;
