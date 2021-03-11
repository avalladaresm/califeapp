export interface Plan {
  idPlan: number
  name: string
  carnets?: number
  paymentMethod: string
  coverage: number
  initialCost: number
  incrementPrice: number
  percentage: number
  servicesPrice: number
  son1: number
  son2: number
  son3: number
  son4: number
  son5: number
  insuranceLifeCober1: number
  insuranceLifePrice1: number
  insuranceLifeCober2: number
  insuranceLifePrice2: number
  insuranceLifeCober3: number
  insuranceLifePrice3: number
  insuranceLifeCober4: number
  insuranceLifePrice4: number
  maternityPrice: number
  maternityCesareaCober: number
  maternityPartoCober: number
  notes?: string
  notesRTFBenefits: string
}

export interface PlanCustomer {
  planName?: string
  startDate?: Date
  endDate?: Date
  dobHolder?: Date
  dobPartner?: Date
  includeSpouse?: number
  sons?: number
  insuranceLife?: number
  includeMaternity?: number
  initialFee?: number
  monthlyFee?: number
  status?: string
}