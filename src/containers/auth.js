import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import { Checkbox, Input, Button } from 'antd'
import * as loginActions from '../actions/login'

const Auth = (props) => {
  return (
    <Formik
      actions={props.loginActions}
      initialValues={{ username: '', password: '', remember: false }}
      validate={(values) => {
        let errors = {}
        if (!values.username) {
          errors.username = 'Gerekli Alan'
        }

        if (!values.password) {
          errors.password = 'Gerekli Alan'
        }

        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.loginActions.loginSubmit(values)
        setTimeout(() => {
          setSubmitting(false)
        }, 1000)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            placeholder="Kullanıcı Adınız"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          <div className="field-error">
            {errors.username && touched.username && errors.username}
          </div>
          <Input
            placeholder="Şifreniz"
            type="text"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />

          <div className="field-error">
            {errors.password && touched.password && errors.password}{' '}
          </div>
          <Checkbox
            name="remember"
            value={values.remember}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            Beni Hatırla
          </Checkbox> 

          <Button type="primary" htmlType="submit" disabled={isSubmitting} block>
            Giriş Yap
          </Button>
        </form>
      )}
    </Formik>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(Auth)
