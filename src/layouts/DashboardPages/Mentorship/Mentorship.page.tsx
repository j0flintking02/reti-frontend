import Layout from "antd/es/layout/layout";
import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Header from "../../../components/secondary/Header";
import CustomDashboardLayout from "../../../components/secondary/CustomDashboardPagesLayout";
import DeletePopconfirm from "../../../components/secondary/CustomDeletePopUp";
import { useGetMentorInspirationsQuery, useDeleteInspirationMutation } from '../../../services/inspirations';
import { toast } from 'react-toastify';
import AddInspirationsForm from "../Forms/AddGuidanceForm";
import { useState } from 'react';
import MentorshipCalendar from '../../../components/secondary/Calendar';

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    start: "1:00 PM",
    startDatetime: "2022-01-21T13:00",
    end: "2:30 PM",
    endDatetime: "2022-01-21T14:30",
    date: "January 10th",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
  },
];

export default function MentorshipDates() {
  const { data: inspirationsData } = useGetMentorInspirationsQuery();
  const [deleteInspiration] = useDeleteInspirationMutation();
  const [editingInspiration, setEditingInspiration] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (inspiration) => {
    setEditingInspiration(inspiration);
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingInspiration(null);
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
    setEditingInspiration(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteInspiration(id).unwrap();
      toast.success('Inspiration deleted successfully');
    } catch (error) {
      toast.error('Failed to delete inspiration');
    }
  };

  return (
    <>
      <Header pageTitle="Community Guidance" />
      <CustomDashboardLayout>
        <Layout>
          <div className="flex justify-end mb-4">
            <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
              Add Inspiration
            </Button>
          </div>

          <AddInspirationsForm
            open={isAddModalOpen}
            onOk={() => setIsAddModalOpen(false)}
            onCancel={() => setIsAddModalOpen(false)}
            loading={false}
          />

          <AddInspirationsForm
            open={isEditModalOpen}
            onOk={handleEditOk}
            onCancel={handleEditCancel}
            loading={false}
            initialData={editingInspiration}
            isEdit={true}
          />

          <div className="sm:flex mt-8">
            <div className="sm:w-6/12 border-r">
              <div className="flex items-center justify-between mt-4 sm:mt-0 px-2">
                <h2 className="text-lg font-semibold">
                  {" "}
                  Schedule for <time dateTime="2022-01-21">January 21, 2022</time>
                </h2>
              </div>

              {/* Inspirations List */}
              <div className="mt-6 space-y-2 overflow-y-auto h-screen">
                {meetings?.map((meeting) => (
                  <div key={meeting.id}>
                    <div className="flex w-full items-center justify-between space-x-2 py-2">
                      <img
                        alt=""
                        src={meeting.imageUrl}
                        className="size-10 shrink-0 rounded-full bg-gray-300"
                      />
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-2">
                          <h3 className="truncate text-sm font-medium text-gray-900">
                            {meeting.name}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {" "}
                          {meeting.date} at {meeting.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* calender */}
            <div className="sm:w-4/12 p-4">
              <Card title="Activity Calendar" className="shadow-sm mb-1">
                <MentorshipCalendar />
              </Card>
            </div>

            {/* inspirations */}
            <div className="sm:w-8/12 border-l">
              <div className="flex items-center justify-between mt-8 sm:mt-0 px-4 py-2">
                <h2 className="text-lg font-semibold">Guidance</h2>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-screen px-4">
                {inspirationsData?.data?.map((inspiration) => (
                  <div key={inspiration.id} className="border-b p-3">
                    <p className="text-red-500 font-medium">{inspiration.title}</p>
                    <div>
                      <p className="text-sm text-gray-600">{inspiration.content}</p>
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                      <EditOutlined
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEdit(inspiration)}
                      />
                      <DeletePopconfirm
                        title="Delete"
                        description="Are you sure to delete this inspiration?"
                        onConfirm={() => handleDelete(inspiration.id)}
                        okText="Yes"
                        cancelText="No"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      </CustomDashboardLayout>
    </>
  );
}