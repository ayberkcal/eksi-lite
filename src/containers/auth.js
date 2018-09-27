import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import { Checkbox, Input, Button, Form } from 'antd'
import * as loginActions from '../actions/login'
const FormItem = Form.Item

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
        props.loginActions.loginSubmit(values).then(() => setSubmitting(false))
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
          <FormItem
            validateStatus={errors.username && touched.username ? 'error' : ''}
            help={errors.username && touched.username ? 'Gerekli Alan' : null}
          >
            <Input
              placeholder="Kullanıcı Adınız"
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
          </FormItem>
          <FormItem
            validateStatus={errors.password && touched.password ? 'error' : ''}
            help={errors.password && touched.password ? 'Gerekli Alan' : null}
          >
            <Input
              placeholder="Şifreniz"
              type="text"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </FormItem>
          <FormItem>
            <Checkbox
              name="remember"
              value={values.remember}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Beni Hatırla
            </Checkbox>
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
            block
          >
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
