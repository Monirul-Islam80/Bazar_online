import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import { MdAccountBalance, MdLibraryAddCheck, MdLocalShipping } from 'react-icons/md'
import './CheckOutStep.css'
const CheckOutSteps = ({activeSteps}) => {
    const steps=[
      {
        label: <Typography>Shipping Details</Typography>,
        icon: <MdLocalShipping/>
      },
      {
        label: <Typography>Confirm Order</Typography>,
        icon: <MdLibraryAddCheck/>
      },
      {
        label: <Typography>Payment</Typography>,
        icon: <MdAccountBalance/>
      }
    ];

    const stepStyles = {
      boxSizing: 'border-box',
    };
  return (
    <>
    <Stepper alternativeLabel activeStep={activeSteps} style={stepStyles}>
      {steps.map((item, index)=>(
        <Step key={index} active={activeSteps === index ? true : false}
        completed={activeSteps >= index ? true : false}>
          <StepLabel icon={item.icon}
          style={{color: activeSteps >= index ? '#0aceff': 'rgba(0, 0, 0, 0.5)'}}>{item.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </>
  )
}

export default CheckOutSteps