import { useParams } from 'react-router-dom';
import CustomAppTitle from '../../../components/seconday/CustomAppTitle';
import {Avatar, Button} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { formatDistanceToNow } from '../../../utils';
import { EditOutlined, EnvironmentOutlined, MailOutlined, MoneyCollectOutlined, PhoneOutlined, ScheduleOutlined } from '@ant-design/icons';
import CustomDahboardLayout from '../../../components/seconday/CustomDashboardPagesLayout';
import Header from '../../../components/seconday/Header';
import {useGetOpportunityDetailsQuery} from "../../../services/opportunities.ts";
import DeletePopconfirm from '../../../components/seconday/CustomDeletePopUp';
import { useState } from 'react';
import AddOpportunitiesForm  from '../Forms/AddOpportunityForm.tsx';
import { loginDetails } from '../../../utils';

const OpportunitiesDetailsPage = () => {
    const { id } = useParams();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const {data} = useGetOpportunityDetailsQuery(id);
    const jobCreatedDate = new Date(data?.data.createdAt);

    const handleDeleteJob = async () => {
        // Implement delete logic here
        console.log('Deleting job:', id);
    };

    const handleCancel = () => {
        setIsEditOpen(false);
    };

    return (
        <div>
            <Header pageTitle="Opportunity Details" />
            <CustomAppTitle showBackButton={true}></CustomAppTitle>
            <CustomDahboardLayout>
                <Content className="bg-white mt-2 border border-gray-900/10 rounded-lg relative">
                    <div className='sm:flex  justify-between'>
                        <div className="sm:w-8/12 border-r border-gray-200 p-6">
                            {/* job section */}
                            <div className="">
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">{data?.data.title}</h1>

                                <div>
                                    <h3 className="pt-2 text-lg font-semibold text-gray-900"> {data?.data.companyName}</h3>
                                    <p className="text-sm text-gray-500">{`Posted ${formatDistanceToNow(jobCreatedDate)}`}</p>
                                </div>

                                <p className="text-md text-gray-700 mb-6">{data?.data.description}</p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800">Application Deadline: { }
                                        <span className="text-gray-600">{new Date(data?.data.applicationDeadline).toLocaleDateString()}</span>
                                    </h4>
                                </div>


                <div className="">
                  <p className="text-sm truncate text-gray-500 flex items-center gap-2">
                    <span className="text-gray-400">
                      <EnvironmentOutlined />
                    </span>
                    {data?.data.location}
                  </p>

                  <p className="text-sm truncate text-gray-500 flex items-center gap-2">
                    <span className="text-gray-400">
                      <ScheduleOutlined />
                    </span>
                    {data?.data.jobType}
                  </p>
                </div>

                                <div className="mb-4">

                                    <p className="text-sm truncate text-gray-500 flex items-center gap-2">
                                        <span className="text-gray-400">
                                            <MoneyCollectOutlined />
                                        </span>
                                        UGX {data?.data.salary.min} - UGX {data?.data.salary.max}
                                    </p>
                                </div>

                                <Button className='mt-4' type="primary">Apply now</Button>

                            </div>
                        </div>


                        {/* job post */}
                        <div className="w-4/12">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Posted by</h3>
                                <div className="flex items-center gap-x-3">
                                    <Avatar>{data?.data.companyName[0]}</Avatar>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{data?.data.companyName}</h4>
                                        <p className="text-md text-gray-600"></p>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <h4 className="font-semibold text-gray-800">Company: <span className="text-gray-600">{data?.data.companyName}</span></h4>
                                </div>

                                <div className="mt-2">
                                    <h4 className="font-semibold text-gray-800">Contact:</h4>

                                    <p className="text-sm truncate text-gray-500 flex items-center gap-2">
                                        <span className="text-gray-400">
                                            <MailOutlined />
                                        </span>
                                        {data?.data.contactEmail}
                                    </p>
                                    <p className="text-sm truncate text-gray-500 flex items-center gap-2">
                                        <span className="text-gray-400">
                                            <EnvironmentOutlined />
                                        </span>
                                        {data?.data.location}
                                    </p>
                                    <p className="text-sm truncate text-gray-500 flex items-center gap-2">
                                        <span className="text-gray-400">
                                            <PhoneOutlined />
                                        </span>

                                    </p>
                                </div>

                                <Button className=" bg-green-600 text-white hover:bg-green-700" type='default'>Contact recruiter</Button>
                            </div>
                        </div>
                    </div>
                    {loginDetails().user.role === 'employer' && (
                        <div className="absolute bottom-4 right-4 space-y-2">
                            <div>
                                <DeletePopconfirm
                                    title="Delete"
                                    description="Are you sure to delete this job?"
                                    onConfirm={handleDeleteJob}
                                    onConfirmMessage="Job deleted successfully"
                                    onCancelMessage="Job deletion cancelled"
                                    okText="Yes"
                                    cancelText="No"
                                />
                            </div>
                            <div>
                                <EditOutlined
                                    onClick={() => setIsEditOpen(true)}
                                    className="text-blue-500 cursor-pointer text-lg"
                                />
                            </div>
                        </div>
                    )}
                    {loginDetails().user.role === 'employer' && (
                        <AddOpportunitiesForm
                            onCancel={handleCancel}
                            onOk={() => setIsEditOpen(false)}
                            open={isEditOpen}
                            loading={false}
                        />
                    )}
                </Content>
            </CustomDahboardLayout>
        </div>
    );
};

export default OpportunitiesDetailsPage;
