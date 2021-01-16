/* eslint-disable default-case */
import React, { Fragment, useState, useEffect } from 'react'
import './main.sass'
import { CRUD } from './api/crud'


export const App = () => {
  const { POST } = CRUD()
  const [Form, setForm] = useState({ email: '' })

  const [ Email, setEmail ] = useState('')

  const [ EmailDirty, setEmailDirty ] = useState(false)

  const [ EmailError, setEmailError ] = useState('Поле не может быть пустым!')

  const [ FormValid, setFormValid ] = useState(false)

  useEffect(() => {
    if(EmailError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
}, [EmailError])

const EmailHandler = (e) => {
  setEmail(e.target.value)
  if (e.target.value.length < 6) {
      setEmailError('Email слишком короткий!')
      if(e.target.value.length === 0) {
          setEmailError('Поле не может быть пустым!')}
  } else {
      setForm({ ...Form, [e.target.name]: e.target.value })
      setEmailError('')
  }
}

const blurHandler = (e) => {
  switch (e.target.name) {
      case 'email':
          setEmailDirty(true);
          break
  }
}

  const create = async (e) => {
      e.preventDefault()
      await POST(`/mail`, {...Form})
  }
  return (
    <Fragment>
      <div className="Them">
        <form 
          onSubmit={create}
          className="Form">
          <p className="Label">Sendself a maill:</p>
          <div className="EmailForm">
            <input
              type="text"
              className="EmailInput" 
              value={Email}
              name="email"
              placeholder="Enter ure email"
              onChange={(e) => EmailHandler(e)} 
              onBlur={e => blurHandler(e)} />
            <p className="Error">{(EmailDirty && EmailError) && <span>{EmailError}</span>}</p>
          </div>
          <button 
            type="submit"
            className="Btn" 
            disabled={!FormValid}>Send</button>
        </form>
      </div>
    </Fragment>
  );
}