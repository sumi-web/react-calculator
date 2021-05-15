import React, { useEffect, useRef } from 'react'

const Display = ({ number, total }) => {
  const myInput = useRef()
  useEffect(() => {
    if (!number.join("")) {
      myInput.current.focus()
    }
  }, [number])

  return (
    <div className="display">
      <input ref={myInput} className="upper-display" defaultValue={number.join("")} />
      <div className="lower-display">{isFinite(total) ? total : "malformed expression"}</div>
    </div>
  )
}
export default Display