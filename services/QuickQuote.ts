import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"

export const createQuickQuote = async (accessToken: string, values: any) => {
  try {
    await axios.post(`http://localhost:4000/quickQuote/createQuickQuote`, {
      data: {
        userId: values.userId,
        planId: values.planId,
        createdAt: values.createdAt,
        holderDob: values.holderDob,
        partnerDob: values.partnerDob,
        children: values.children,
        lifeInsurance: values.lifeInsurance,
        isMaternityIncluded: values.isMaternityIncluded,
        paymentRecurrence: values.paymentRecurrence,
        downPayment: values.downPayment,
        monthlyPayment: values.monthlyPayment,
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

const FetchQuickQuotes = async (accessToken: string): Promise<any> => {
  const quickQuotes = await axios.get(`http://localhost:4000/quickQuote/getAllQuickQuotes`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return quickQuotes.data
}

export const useQuickQuotes = (accessToken: string): QueryObserverResult<any, AxiosError> => {
  return useQuery('QuickQuotes', async () => await FetchQuickQuotes(accessToken), { refetchOnMount: false })
}
