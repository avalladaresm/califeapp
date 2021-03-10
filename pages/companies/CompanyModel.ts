import { ReactElement } from "react";

export interface Company {
  name: string
  type: string
  image?: string
  phone?: string
  contact?: string
  description?: string
  direction?: string
  actions?: ReactElement
}