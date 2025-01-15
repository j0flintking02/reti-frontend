import React from 'react';
import { Modal, Descriptions, Button, Space, Popconfirm, Tag } from 'antd';
import { MentorshipSession } from '../../../services/types/mentorship';
import { format } from 'date-fns';
import { useDeleteMentorshipSessionMutation } from '../../../services/mentorshipSessions';

interface MentorshipSessionDetailsProps {
  session: MentorshipSession | null;
  visible: boolean;
  onClose: () => void;
  onEdit: (session: MentorshipSession) => void;
  userRole: 'mentor' | 'youth';
}

const AddMentorshipSessionForm: React.FC<MentorshipSessionDetailsProps> = ({
  session,
  visible,
  onClose,
  onEdit,
}) => {
  const [deleteSession] = useDeleteMentorshipSessionMutation();

  if (!session) return null;

  const handleDelete = async () => {
    try {
      await deleteSession(session.id).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'processing';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Modal
      title="Session Details"
      open={visible}
      onCancel={onClose}
      footer={
        <Space>
          <Button onClick={onClose}>Close</Button>
          <Button type="primary" onClick={() => onEdit(session)}>
            Edit Session
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this session?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete Session</Button>
          </Popconfirm>
        </Space>
      }
      width={600}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Title">{session.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{session.description}</Descriptions.Item>
        <Descriptions.Item label="Start Time">
          {format(new Date(session.startTime), 'PPpp')}
        </Descriptions.Item>
        <Descriptions.Item label="End Time">
          {format(new Date(session.endTime), 'PPpp')}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={getStatusColor(session.status)}>{session.status.toUpperCase()}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Location">{session.location || 'Not specified'}</Descriptions.Item>
        {session.meetingLink && (
          <Descriptions.Item label="Meeting Link">
            <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
              Join Meeting
            </a>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};

export default AddMentorshipSessionForm;
