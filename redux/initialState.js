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
    userId: 0,
    dateOfBirth: null,
    gender: null,
    goal: null,
  },
  weights: {
    currentWeight: 0,
    listWeights: [],
  },
  heights: {
    currentHeight: 0,
    listHeights: [],
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
  notifications: null,
};

export default initialState;
