export interface MentorshipSession {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  mentorId: number;
  youthId: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string; // Can be online/physical location
  meetingLink?: string; // For online sessions
  createdAt: string;
  updatedAt: string;
}

export interface CreateMentorshipSessionDto {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  mentorId: number;
  youthId: number;
  location?: string;
  meetingLink?: string;
}

export interface UpdateMentorshipSessionDto extends Partial<CreateMentorshipSessionDto> {
  status?: 'scheduled' | 'completed' | 'cancelled';
}

export interface MentorshipSessionResponse {
  status: string;
  data: MentorshipSession;
}

export interface MentorshipSessionsResponse {
  status: string;
  data: MentorshipSession[];
}
