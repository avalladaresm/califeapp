import axios from "axios"

export const CreatePlanCustomer = async (accessToken: string, values: any) => {
  try {
    await axios.post(`http://localhost:4000/planCustomer/createPlanCustomer`, {
      data: {
        planId: values.planId,
        createdAt: values.createdAt,
        holderDob: values.holderDob,
        partnerDob: values.partnerDob,
        children: values.children,
        lifeInsurance: values.lifeInsurance,
        isMaternityIncluded: values.isMaternityIncluded,
        installments: values.installments,
        downPayment: values.downPayment,
        installmentPayment: values.installmentPayment,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    })
  } catch (e) {
    throw e
  }
}