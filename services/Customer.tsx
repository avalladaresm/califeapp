import axios from 'axios'

export const createCustomer = async (accessToken: string, values: any) => {
  try {
    const createdCustomer = await axios.post(`http://localhost:4000/customer/createCustomer`, {
      data: {
        uid: values.uid,
        firstname: values.firstname,
        middlename: values.middlename,
        firstSurname: values.firstSurname,
        secondSurname: values.secondSurname,
        surnameAfterMarried: values.surnameAfterMarried,
        email: values.email,
        gender: values.gender,
        birthDate: values.birthDate,
        maritalStatus: values.maritalStatus,
        occupation: values.occupation,
        weight: values.weight,
        height: values.height,
        worksAt: values.worksAt,
        workAddress: values.workAddress,
        neighborhood: values.neighborhood,
        avenue: values.avenue,
        street: values.street,
        block: values.block,
        houseNumber: values.houseNumber,
        addressType: values.addressType,
        city: values.city,
        state: values.state,
        country: values.country,
        identificationDocument: values.identificationDocument,
        identificationDocumentType: values.identificationDocumentType,
        phoneNumber: values.phoneNumber,
        phoneNumberType: values.phoneNumberType
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    })
    return createdCustomer
  } catch (e) {
    throw e
  }
}
