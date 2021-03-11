import React, { createContext, useContext, useState } from "react";

export const PlanContext = createContext(undefined)
export const SelectedPlanContext = createContext(undefined)

export function usePlan() {
  return useContext(PlanContext)
}

export function SelectedPlan() {
  return useContext(SelectedPlanContext)
}

export function PlanProvider({ children }) {
  const [_plan, _setPlan] = useState()

  return (
    <PlanContext.Provider value={_plan}>
      <SelectedPlanContext.Provider value={_setPlan}>
        {children}
      </SelectedPlanContext.Provider>
    </PlanContext.Provider >
  )
}