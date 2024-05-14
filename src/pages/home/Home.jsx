import { Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import { Form } from 'react-router-dom'
import RoomsSection from '../../components/RoomsSection'
const Home = () => {
  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
      }}
    >
      <h1>Create Flower: </h1>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ flex: 1 }}
        layout="horizontal"
        style={{
          marginTop: 20,
          maxHeight: "400px",
          overflowY: "auto",
          padding: "4px 0",
        }}
      // onFinish={onSubmit}
      >
        <FormItem
          key={"nam_1"}
          // control={control}
          name={"name"}
          label={
            <span
              style={{
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            >
              name
            </span>
          }
        >
          {/* <Input onChange={onChange} placeholder={`Type name here . . .`} /> */}
        </FormItem>
        <button type="submit">Create</button>
      </Form>

      <br />
      <h1>List of Flower: </h1>
      <RoomsSection />
    </div>
  )
}

export default Home