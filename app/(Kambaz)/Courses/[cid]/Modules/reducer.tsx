import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module: string;
}
interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}
interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<{ name: string; course: string }>) => {
      const moduleData = action.payload;
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: moduleData.name,
        course: moduleData.course,
        description: "",
        editing: false,
      };
      state.modules.push(newModule);
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      state.modules = state.modules.filter(
        (m: Module) => m._id !== moduleId
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      const moduleData = action.payload; // Renamed from 'module'
      state.modules = state.modules.map((m: Module) =>
        m._id === moduleData._id ? moduleData : m
      );
    },
    editModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      state.modules = state.modules.map((m: Module) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;