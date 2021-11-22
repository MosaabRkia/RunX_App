const initialState = {
  drinks: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
  },
  login: {
    token: null,
    error: "",
    data: null,
    firstName: "",
    weight: 0,
  },
  sleeps: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
  },
  kCal: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
  },
  Steps: {
    done: 0,
    error: "",
    goal: 0,
    id: "",
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
};

export default initialState;
