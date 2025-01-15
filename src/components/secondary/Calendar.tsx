import { useState } from 'react';
import { Calendar, Badge, Modal, Form, Input, DatePicker, Button, Select, message } from 'antd';
import type { Dayjs } from 'dayjs';
import { MentorshipSession } from '../../services/types/mentorship';
import { useCreateMentorshipSessionMutation, useGetMentorshipSessionsQuery, useUpdateMentorshipSessionMutation } from '../../services/mentorshipSessions';
import { useGetMentorsQuery, useGetYouthQuery } from '../../services/users';
import { loginDetails } from '../../utils';
import MentorshipSessionDetails from '../../layouts/DashboardPages/Forms/AddMentorshipSessionForm';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const MentorshipCalendar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<MentorshipSession | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const user = loginDetails();

  const { data: sessions = [] } = useGetMentorshipSessionsQuery();
  const { data: mentors = [] } = useGetMentorsQuery();
  const { data: youth = [] } = useGetYouthQuery();
  const [createSession] = useCreateMentorshipSessionMutation();
  const [updateSession] = useUpdateMentorshipSessionMutation();

  const dateCellRender = (value: Dayjs) => {
    const daySessions = sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return value.isSame(sessionDate, 'day');
    });

    return (
      <ul className="events">
        {daySessions.map(session => (
          <li key={session.id} onClick={(e) => {
            e.stopPropagation();
            setSelectedSession(session);
            setIsDetailsVisible(true);
          }}>
            <Badge
              status={session.status === 'scheduled' ? 'processing' : session.status === 'completed' ? 'success' : 'error'}
              text={session.title}
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleCreateSession = async (values: any) => {
    try {
      const [startTime, endTime] = values.timeRange;

      const sessionData = {
        title: values.title,
        description: values.description,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        mentorId: user.role === 'mentor' ? user.id : values.mentorId,
        youthId: user.role === 'youth' ? user.id : values.youthId,
        location: values.location,
        meetingLink: values.meetingLink,
      };

      await createSession(sessionData).unwrap();
      message.success('Mentorship session created successfully!');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create mentorship session');
    }
  };

  const handleEditSession = (session: MentorshipSession) => {
    setSelectedSession(session);
    setIsDetailsVisible(false);
    form.setFieldsValue({
      title: session.title,
      description: session.description,
      timeRange: [Dayjs(session.startTime), Dayjs(session.endTime)],
      location: session.location,
      meetingLink: session.meetingLink,
      mentorId: session.mentorId,
      youthId: session.youthId,
    });
    setIsModalVisible(true);
  };

  return (
    <div className="px-2 text-center">
      <div className="mentorship-calendar">
        <Calendar
          dateCellRender={dateCellRender}
          onSelect={handleDateSelect}
        />

        <Modal
          title={selectedSession ? "Edit Mentorship Session" : "Create Mentorship Session"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedSession(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={selectedSession ? updateSession : handleCreateSession}
            initialValues={{
              date: selectedDate,
            }}
          >
            <Form.Item
              name="title"
              label="Session Title"
              rules={[{ required: true, message: 'Please enter session title' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter session description' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="timeRange"
              label="Session Time"
              rules={[{ required: true, message: 'Please select session time' }]}
            >
              <RangePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
            >
              <Input placeholder="Physical location or 'Online'" />
            </Form.Item>

            <Form.Item
              name="meetingLink"
              label="Meeting Link"
            >
              <Input placeholder="Online meeting link (if applicable)" />
            </Form.Item>

            {user?.role === 'youth' && (
              <Form.Item
                name="mentorId"
                label="Select Mentor"
                rules={[{ required: true, message: 'Please select a mentor' }]}
              >
                <Select placeholder="Select mentor">
                  {mentors?.data?.map((mentor: any) => (
                    <Select.Option key={mentor.id} value={mentor.id}>
                      {`${mentor.firstName} ${mentor.lastName}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {user?.role === 'mentor' && (
              <Form.Item
                name="youthId"
                label="Select Youth"
                rules={[{ required: true, message: 'Please select a youth' }]}
              >
                <Select placeholder="Select youth">
                  {youth?.data?.map((y: any) => (
                    <Select.Option key={y.id} value={y.id}>
                      {`${y.firstName} ${y.lastName}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {selectedSession ? 'Update Session' : 'Create Session'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <MentorshipSessionDetails
          session={selectedSession}
          visible={isDetailsVisible}
          onClose={() => {
            setIsDetailsVisible(false);
            setSelectedSession(null);
          }}
          onEdit={handleEditSession}
          userRole={user?.role as 'mentor' | 'youth'}
        />
      </div>
    </div>
  );
};

export default MentorshipCalendar;
