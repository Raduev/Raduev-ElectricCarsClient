const initialStateGetByElectroCar = {
  electroCar: [],
  error: null,
  loading: false,
};

export default function GetByElectroCar(
  state = initialStateGetByElectroCar,
  action
) {
  switch (action.type) {
    case "ElectroCar/Loading/pending":
      return {
        ...state,
        loading: true,
      };
    case "ElectroCar/Loading/fullfilled":
      return {
        ...state,
        electroCar: action.payload,
        loading: false,
      };
    case "ElectroCar/Loading/rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const GetByCar = (id) => {
  return async (dispatch) => {
    dispatch({ type: "ElectroCar/Loading/pending" });
    try {
      console.log(id);
      const responce = await fetch(`http://localhost:3000/ElectricCar/${id}`);
      const electricCars = await responce.json();
      dispatch({
        type: "ElectroCar/Loading/fullfilled",
        payload: electricCars,
      });
    } catch (error) {
      dispatch({ type: "ElectroCar/Loading/rejected", payload: error });
    }
  };
};
