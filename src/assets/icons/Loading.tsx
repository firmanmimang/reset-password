import React from 'react'

export default function Loading({className}: {className?:any}) {
  return (
    <svg className={`m-auto bg-none block ${className}`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx={50} cy={50} r={44} strokeWidth={9} stroke="#1f2937" strokeDasharray="69.11503837897544 69.11503837897544" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.7042253521126761s" keyTimes="0;1" values="0 50 50;360 50 50"/>
      </circle>
      <circle cx={50} cy={50} r={44} strokeWidth={9} stroke="#f3f4f6" strokeDasharray="69.11503837897544 69.11503837897544" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.7042253521126761s" keyTimes="0;1" values="0 50 50;360 50 50"/>
      </circle>
    </svg>
  )
}
