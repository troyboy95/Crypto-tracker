import React from 'react'

const SelectButton = ({children, selected, onClick}) => {
  return (
    <span style={{
        border: " 1px solid gold",
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Montserrat',
        cursor: 'pointer',
        backgroundColor: selected ? 'gold' : "",
        color: selected ? 'black' : "",
        fontWeight: selected ? 700 : 500,
        "&hover" : {
            backgroundColor: 'gold',
            color: 'black'
        },
        width: "22%",
        textAlign: 'center',
        margin: 5
    }}
    onClick={onClick}
    >
      {children}
    </span>
  )
}

export default SelectButton
