const initialStateElectricCars = {
  electricCar: [],
  error: null,
  loading: false,
};

export default function electricCars(state = initialStateElectricCars, action) {
  switch (action.type) {
    case "electricCar/loading/pending":
      return {
        ...state,
        loading: true,
      };
    case "electricCar/loading/fullfiled":
      return {
        ...state,
        electricCar: action.payload,
        loading: false,
      };
    case "electricCar/loading/rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const GetElectricCars = () => {
  return async (dispatch) => {
    dispatch({ type: "electricCar/loading/pending" });
    try {
      const responce = await fetch("http://localhost:3000/ElectricCar");
      const electricCars = await responce.json();
      dispatch({
        type: "electricCar/loading/fullfiled",
        payload: electricCars,
      });
    } catch (error) {
      dispatch({ type: "electricCar/loading/rejected", payload: error });
    }
  };
};
