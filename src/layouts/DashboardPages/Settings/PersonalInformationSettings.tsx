import {EditOutlined, UserOutlined} from "@ant-design/icons";
import {Alert, Avatar, Button, Input, Spin, Form, DatePicker, Select, notification} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Content} from "antd/es/layout/layout";
import {useGetUserProfileQuery, useUpdateProfileMutation} from "../../../services/users.ts";
import {loginDetails} from "../../../utils.ts";
import {useEffect} from "react";
import moment from "moment";


const PersonalInformationSettings = () => {
    const {data, isLoading, isError, error, } = useGetUserProfileQuery(loginDetails().user.id)
    const [updateUser, {isSuccess}] = useUpdateProfileMutation()
    const [form] = Form.useForm();
    useEffect(() => {
        if (isError) {
            notification['error']({
                message: "Something went wrong",
                description: error.data.message,
            })
        }
    }, [isError, error]);
    const handleFinish = async (values)=> {
        try {
            await updateUser({data:values, user_id: loginDetails().user.id}).unwrap()
        } catch (e) {
            let message = 'Try again'
            if (typeof e.data.message === "string") {
                message = e.data.message
            } else {
                message = e.data.message[0]
            }
            notification['error']({
                message: 'Something went wrong',
                description:
                message,
            });
        }
    }
    useEffect(() => {
        if (isSuccess) {
            notification["success"]({
                message: 'Profile updated successfully',
            })
        }
    }, [isSuccess]);

    return (
        <Content className="px-4 py-4 space-y-4 bg-white border border-gray-900/10 rounded-lg">
            <div className="sm:flex sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Update your photo and personal details here.</p>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button className="w-32 p-2">
                        Cancel
                    </Button>
                    <Button className="w-32 p-2" type="primary">
                        Save changes
                    </Button>
                </div>
            </div>

            {/* profile picture and inputs */}
            <div className="sm:flex gap-2 border-b border-gray-900/10 py-8">
                <div className="sm:w-3/12 text-center text-gray-900 mb-8">
                    <div>
                        <Avatar size={80} icon={<UserOutlined/>}/>
                        <p className="text-md font-semibold mt-2">{data&&`${data?.data.user.firstName} ${data?.data.user.lastName}`}</p>
                        <Button type="text" icon={<EditOutlined/>} className="text-blue-500 mt-2">
                            Change avatar
                        </Button>
                    </div>
                </div>
                {isLoading && <div className="w-auto text-center">
                    <Spin size="large"/>
                </div>}

                {!isLoading && <Form layout="vertical" form={form} initialValues={{
                    firstName: data?.data.user.firstName,
                    lastName: data?.data.user.lastName,
                    email: data?.data.email,
                    phoneNumber: data?.data.user.phoneNumber,
                    gender: data?.data.gender,
                    bio: data?.data.bio,
                    dateOfBirth: moment(data?.data.dateOfBirth),
                    "prefix": "256",
                }} onFinish={handleFinish} className="sm:w-9/12 space-y-4">
                    <Form.Item>
                        <Form.Item
                            style={{display: 'inline-block', width: '50%', margin: '0'}}
                            label="First Name" name="firstName">
                            <Input
                                size="large"
                                placeholder="Enter your first name"
                                type="text"
                            />
                        </Form.Item>
                        <Form.Item
                            style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 8px'}}
                            label="Last name" name="lastName">
                            <Input size="large" placeholder="Enter your Last name" type="text"/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className="">
                        <Form.Item
                            style={{display: 'inline-block', width: '50%', margin: '0'}}
                            label="Date of birth" name="dateOfBirth">
                            <DatePicker size="large" className="w-full"/>
                        </Form.Item>

                        <Form.Item
                            style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 8px'}}
                            label="Gender" name="gender">
                            <Select size="large">
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                                <Select.Option value="other">Other</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className="my-24">
                        <Form.Item
                            style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 8px'}}
                            label="Email address" name="email">
                            <Input
                                size="large"
                                placeholder="Enter your email"
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item
                            style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 8px'}}
                            label="Phone number" name="phoneNumber">
                            <Input size="large"/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="About me" className="my-24" name="bio">
                        <TextArea placeholder="" allowClear/>
                    </Form.Item>
                </Form>}

            </div>

            <div className="mt-10">
                <Alert
                    message="Delete your account"
                    className="p-4 flex"
                    // showIcon
                    description="Once you delete your account, all your data will be permanently removed."
                    type="error"
                    action={
                        <Button size="large" danger>
                            Delete your account
                        </Button>
                    }
                />
            </div>
        </Content>
    )
};

export default PersonalInformationSettings;