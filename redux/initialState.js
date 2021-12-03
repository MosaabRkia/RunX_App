const initialState = {
  drinks: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
    listDrinks: [],
  },
  login: {
    token: null,
    error: "",
    data: null,
    firstName: "",
    weight: 0,
  },
  weight: {
    listWeights: [],
  },
  sleeps: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
    listSleeps: [],
  },
  kCal: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
    listKcals: [],
  },
  Steps: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
    listSteps: [],
  },
  meals: {
    error: "",
    dinner: [],
    breakfast: [],
    brunch: [],
    launch: [],
  },
  meds: {
    error: "",
    list: [],
  },
  register: {
    error: "",
    success: false,
  },
};

export default initialState;
