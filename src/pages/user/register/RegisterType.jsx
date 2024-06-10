import React from 'react'
import RegisterMember from '../registerPage/Member'
import RegisterPartner from '../registerPage/Partner'


const RegisterType = ({ userType }) => {

  if (userType == 3) {
    return (
      <RegisterMember />
    )
  } else if (userType == 2) {
    return (
      <RegisterPartner/>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default RegisterType