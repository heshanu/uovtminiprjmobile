import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";


export interface ModeofTravel{
    vehicleId:string;
    name:string;
    quantity:number;
    priceperhour:number;
    type:string;
    status: "Avaliable" | "Unavliable";
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  status: "pending" | "processing" | "completed" | "cancelled";
}

export interface HotelItem {
  hotelId: string;
  hotelName: string;
  address: string;
  availableRooms: number;
  img: string;
  numOfStars: number;
  package: string[];
  price: number;
  quantity: number;
}

export interface FoodItem {
  foodId: string;
  name: string;
  image: string;
  ingredients: string[];
  price: number;
  quantity: number;
}

export interface BeverageItem {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  price: number;
  quantity: number;
}

export interface OrderState {
  orderUniqueId: string;
  modeoftraveList:ModeofTravel[];
  orderList: OrderItem[];
  hotelList: HotelItem[];
  foodList: FoodItem[];
  beverageList: BeverageItem[];
  customerId: string;
  orderDate: string;
  currentOrderStatus: string;
  loading: boolean;
  error: string | null;
  totalHotelExpenses: number;
  totalFoodExpenses: number;
  totalBeverageExpenses: number;
  totalTravelExpenses: number;
  totalExpense: number;
}

const initialOrderState: OrderState = {
  orderUniqueId: "",
  orderList: [],
  modeoftraveList:[],
  hotelList: [],
  foodList: [],
  beverageList: [],
  customerId: "",
  orderDate: "",
  currentOrderStatus: "pending",
  loading: false,
  error: null,
  totalHotelExpenses: 0,
  totalFoodExpenses: 0,
  totalBeverageExpenses: 0,
  totalTravelExpenses: 0,
  totalExpense: 0,
};

type OrderAction =
  | { type: "ADD_ORDER_ITEM"; payload: OrderItem }
  | { type: "ADD_HOTEL"; payload: HotelItem }
  | { type: "ADD_FOOD"; payload: FoodItem }
  | { type: "ADD_BEVERAGE"; payload: BeverageItem }
  | { type: "SET_ORDER_STATUS"; payload: string }

  | { type: "REMOVE_ORDER_ITEM"; payload: { productId: string } }
  | { type: "REMOVE_HOTEL"; payload: { hotelId: string } }
  | { type: "REMOVE_FOOD"; payload: { foodId: string } }
  | { type: "REMOVE_BEVERAGE"; payload: { idDrink: string } }

  | { type: "ADD_VEHICLE_ITEM"; payload: ModeofTravel }
  | { type: "REMOVE_VEHICLE_ITEM"; payload: { travelId: string } }
  | { type: "UPDATE_VEHICLE_ITEM"; payload: ModeofTravel }


  | { type: "CLEAR_ORDER" };

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_ORDER_ITEM":
      return {
        ...state,
        orderList: [...state.orderList, action.payload],
      };

    case "ADD_HOTEL":
      return {
        ...state,
        hotelList: [...state.hotelList, action.payload],
        totalHotelExpenses:
          state.totalHotelExpenses +
          action.payload.price * action.payload.quantity,
      };

    case "ADD_FOOD":
      return {
        ...state,
        foodList: [...state.foodList, action.payload],
        totalFoodExpenses:
          state.totalFoodExpenses +
          action.payload.price * action.payload.quantity,
      };

    case "ADD_BEVERAGE":
      return {
        ...state,
        beverageList: [...state.beverageList, action.payload],
        totalBeverageExpenses:
          state.totalBeverageExpenses +
          action.payload.price * action.payload.quantity,
      };

    case "SET_ORDER_STATUS":
      return {
        ...state,
        currentOrderStatus: action.payload,
      };

    case "CLEAR_ORDER":
      return initialOrderState;

    case "REMOVE_ORDER_ITEM":
  return {
    ...state,
    orderList: state.orderList.filter(
      item => item.productId !== action.payload.productId
    ),
  };

  case "REMOVE_HOTEL": {
  const removedHotel = state.hotelList.find(
    h => h.hotelId === action.payload.hotelId
  );

  return {
    ...state,
    hotelList: state.hotelList.filter(
      h => h.hotelId !== action.payload.hotelId
    ),
    totalHotelExpenses: removedHotel
      ? state.totalHotelExpenses -
        removedHotel.price * removedHotel.quantity
      : state.totalHotelExpenses,
  };
}

case "REMOVE_FOOD": {
  const removedFood = state.foodList.find(
    f => f.foodId === action.payload.foodId
  );

  return {
    ...state,
    foodList: state.foodList.filter(
      f => f.foodId !== action.payload.foodId
    ),
    totalFoodExpenses: removedFood
      ? state.totalFoodExpenses -
        removedFood.price * removedFood.quantity
      : state.totalFoodExpenses,
  };
}

case "REMOVE_BEVERAGE": {
  const removedBeverage = state.beverageList.find(
    b => b.idDrink === action.payload.idDrink
  );

  return {
    ...state,
    beverageList: state.beverageList.filter(
      b => b.idDrink !== action.payload.idDrink
    ),
    totalBeverageExpenses: removedBeverage
      ? state.totalBeverageExpenses -
        removedBeverage.price * removedBeverage.quantity
      : state.totalBeverageExpenses,
  };
}

case "ADD_VEHICLE_ITEM":
  return {
    ...state,
    modeoftraveList: [...state.modeoftraveList, action.payload],
    totalTravelExpenses:
      state.totalTravelExpenses +
      action.payload.priceperhour * action.payload.quantity,
  };

case "REMOVE_VEHICLE_ITEM": {
  const removedVehicle = state.modeoftraveList.find(
    v => v.vehicleId === action.payload.travelId
  );

  return {
    ...state,
    modeoftraveList: state.modeoftraveList.filter(
      v => v.vehicleId !== action.payload.travelId
    ),
    totalTravelExpenses: removedVehicle
      ? state.totalTravelExpenses -
        removedVehicle.priceperhour * removedVehicle.quantity
      : state.totalTravelExpenses,
  };
}
case "UPDATE_VEHICLE_ITEM":
  return {
    ...state,
    modeoftraveList: state.modeoftraveList.map(v =>
      v.vehicleId === action.payload.vehicleId
        ? action.payload
        : v
    ),
  };

    default:
      return state;
  }
}


type OrderContextType = {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used inside OrderProvider");
  }

  return context;
}
